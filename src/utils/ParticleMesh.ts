import * as THREE from 'three';

import fragmentShader from '@/assets/shaders/fragment.frag';
import vertexShader   from '@/assets/shaders/vertex.vert';

import type { Stage, ThemeMode } from './Stage';

// ─────────────────────────────────────────
// Constants
// ─────────────────────────────────────────
const NUM_PARTICLES = 20_000;

const BASE_ROTATION_SPEED = 0.00045;
const TILT_X_AMP          = 0.040;
const TILT_Z_AMP          = 0.025;
const TILT_X_SPEED        = 0.20;
const TILT_Z_SPEED        = 0.16;

const CAMERA_Z_REST  = 40.0;
const CAMERA_Z_CLOSE = 1;

const LERP_PROGRESS = 0.042;
const LERP_CAMERA   = 0.038;
const LERP_TILT     = 0.035;
const LERP_VELOCITY = 0.070;
const LERP_THEME    = 0.048;   // テーマ切り替えフェード速度

export class ParticleMesh {
  isReady = false;

  private mesh:  THREE.Points | null = null;
  private group: THREE.Group  | null = null;

  private readonly stage: Stage;
  private readonly clock = new THREE.Clock();

  private targetProgress  = 0;
  private currentProgress = 0;
  private targetVelocity  = 0;
  private currentVelocity = 0;

  private baseRotationY = 0;
  private currentTiltX  = 0;
  private currentTiltZ  = 0;

  // テーマ補間: 0.0 = dark, 1.0 = light
  private targetTheme  = 0;
  private currentTheme = 0;

  constructor(stage: Stage) {
    this.stage = stage;
  }

  async init(): Promise<void> {
    this.buildMesh();
    this.isReady = true;
  }

  // ── Geometry ────────────────────────────────────────────────────

  private buildPositions(): Float32Array {
    const positions = new Float32Array(NUM_PARTICLES * 3);
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const radius = 8 + Math.random() * Math.random() * 72;
      const angle  = Math.random() * Math.PI * 2;
      positions[i * 3 + 0] = Math.cos(angle) * radius + (Math.random() - 0.5) * 5.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 38;
      positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 18;
    }
    return positions;
  }

  private buildSeeds(): Float32Array {
    const seeds = new Float32Array(NUM_PARTICLES);
    for (let i = 0; i < NUM_PARTICLES; i++) seeds[i] = Math.random();
    return seeds;
  }

  private buildMesh(): void {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position',     new THREE.BufferAttribute(this.buildPositions(), 3));
    geometry.setAttribute('particleSeed', new THREE.BufferAttribute(this.buildSeeds(),     1));

    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time:       { value: 0 },
        u_pixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        u_velocity:   { value: 0 },
        u_theme:      { value: 0 },    // 0 = dark, 1 = light
      },
      transparent: true,
      blending:    THREE.AdditiveBlending,
      depthWrite:  false,
    });

    this.mesh  = new THREE.Points(geometry, material);
    this.group = new THREE.Group();
    this.group.add(this.mesh);
    this.stage.scene.add(this.group);
  }

  // ── Public API ──────────────────────────────────────────────────

  onResize(): void {
    const mat = this.getMaterial();
    if (mat) mat.uniforms.u_pixelRatio.value = Math.min(window.devicePixelRatio, 2);
  }

  getMaterial(): THREE.RawShaderMaterial | null {
    return this.mesh?.material as THREE.RawShaderMaterial | null;
  }

  setProgress(progress: number): void {
    const delta         = Math.abs(progress - this.targetProgress);
    this.targetVelocity = Math.min(delta * 16.0, 1.0);
    this.targetProgress = progress;
  }

  /** テーマ変更を受け取る（滑らかにフェード） */
  setTheme(theme: ThemeMode): void {
    this.targetTheme = theme === 'light' ? 1.0 : 0.0;
    this.stage.setTheme(theme);

    // ライトモードは NormalBlending、ダークは AdditiveBlending
    const mat = this.getMaterial();
    if (mat) {
      mat.blending = theme === 'light'
        ? THREE.NormalBlending
        : THREE.AdditiveBlending;
      mat.needsUpdate = true;
    }
  }

  onRaf(): void {
    if (!this.group) return;
    const mat = this.getMaterial();
    if (!mat)    return;

    const t = this.clock.getElapsedTime();

    // ── Shader time ───────────────────────────────────────────────
    mat.uniforms.u_time.value = t;

    // ── Theme lerp (smooth fade between dark/light) ───────────────
    this.currentTheme += (this.targetTheme - this.currentTheme) * LERP_THEME;
    mat.uniforms.u_theme.value = this.currentTheme;

    // ── Scroll progress ───────────────────────────────────────────
    this.currentProgress += (this.targetProgress - this.currentProgress) * LERP_PROGRESS;

    // ── Shimmer velocity ──────────────────────────────────────────
    this.currentVelocity += (this.targetVelocity  - this.currentVelocity)  * LERP_VELOCITY;
    this.targetVelocity  *= 0.84;
    mat.uniforms.u_velocity.value = this.currentVelocity;

    // ── Camera Z — easeInOut pinch ────────────────────────────────
    const p = this.currentProgress;
    const eased = p < 0.5
      ? 2 * p * p
      : 1 - Math.pow(-2 * p + 2, 2) * 0.5;

    this.stage.targetCameraZ = CAMERA_Z_REST + (CAMERA_Z_CLOSE - CAMERA_Z_REST) * eased;
    this.stage.updateCamera(LERP_CAMERA);

    // ── Constant base rotation ────────────────────────────────────
    this.baseRotationY += BASE_ROTATION_SPEED;

    // ── Idle tilt ────────────────────────────────────────────────
    const targetTiltX = Math.sin(t * TILT_X_SPEED) * TILT_X_AMP;
    const targetTiltZ = Math.cos(t * TILT_Z_SPEED) * TILT_Z_AMP;
    this.currentTiltX += (targetTiltX - this.currentTiltX) * LERP_TILT;
    this.currentTiltZ += (targetTiltZ - this.currentTiltZ) * LERP_TILT;

    // ── Apply rotation ────────────────────────────────────────────
    this.group.rotation.x = this.currentTiltX;
    this.group.rotation.y = this.baseRotationY;
    this.group.rotation.z = this.currentTiltZ;
  }

  dispose(): void {
    if (this.mesh) {
      this.mesh.geometry.dispose();
      (this.mesh.material as THREE.Material).dispose();
      this.mesh = null;
    }
    if (this.group) {
      this.stage.scene.remove(this.group);
      this.group = null;
    }
    this.isReady = false;
  }
}
