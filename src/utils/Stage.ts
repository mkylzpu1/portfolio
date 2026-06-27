import * as THREE from 'three';

// ─────────────────────────────────────────
// Constants
// ─────────────────────────────────────────
const CAMERA_FOV  = 60;
const CAMERA_NEAR = 0.1;
const CAMERA_FAR  = 1000;
const CAMERA_X    = 0;
const CAMERA_Y    = 0.5;
const CAMERA_Z    = 4;

/** テーマごとの背景色 */
const CLEAR_COLORS = {
  dark:  0x05070f,
  light: 0xf2f4f8,
} as const;

export type ThemeMode = 'dark' | 'light';

export class Stage {
  scene:    THREE.Scene;
  camera:   THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;

  targetCameraZ  = CAMERA_Z;
  currentCameraZ = CAMERA_Z;

  constructor(canvas: HTMLElement) {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(new THREE.Color(CLEAR_COLORS.dark));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    canvas.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      CAMERA_FOV,
      window.innerWidth / window.innerHeight,
      CAMERA_NEAR,
      CAMERA_FAR,
    );
    this.camera.position.set(CAMERA_X, CAMERA_Y, CAMERA_Z);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  /** テーマ変更時に背景色を更新 */
  setTheme(theme: ThemeMode): void {
    this.renderer.setClearColor(new THREE.Color(CLEAR_COLORS[theme]));
  }

  updateCamera(lerpFactor: number): void {
    this.currentCameraZ += (this.targetCameraZ - this.currentCameraZ) * lerpFactor;
    this.camera.position.z = this.currentCameraZ;
  }

  onResize(): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(w, h);
  }

  render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  dispose(): void {
    this.renderer.dispose();
    if (this.renderer.domElement.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
    }
  }
}
