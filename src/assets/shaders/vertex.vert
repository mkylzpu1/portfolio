attribute vec3 position;
attribute float particleSeed;

uniform float u_time;
uniform float u_pixelRatio;
uniform float u_velocity;
uniform mediump float u_theme;   /* 0.0 = dark, 1.0 = light */

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying float vSeed;
varying float vGlow;
varying vec3 vColor;

// ─────────────────────────────────────────
// Constants
// ─────────────────────────────────────────
const float BREATHE_SPEED = 0.38;
const float BREATHE_AMP   = 0.018;
const float WAVE_SPEED    = 0.55;
const float WAVE_AMP      = 0.022;
const float PULSE_SPEED   = 3.2;
const float PULSE_AMP     = 0.18;
const float SIZE_BASE     = 2.8;
const float SIZE_VAR      = 5.5;

void main() {
    vec3 pos = position;

    // ─── Organic breathing ────────────────────────────────────────
    float breathe = 1.0 + sin(u_time * BREATHE_SPEED + particleSeed * 12.0) * BREATHE_AMP;
    pos *= breathe;

    // ─── Gentle surface wave ──────────────────────────────────────
    float wave = sin(u_time * WAVE_SPEED + particleSeed * 25.0);
    pos += normalize(pos + vec3(0.001)) * wave * WAVE_AMP;

    // ─── Scroll shimmer (velocity-driven, fades at rest) ─────────
    float shimmer = u_velocity * sin(u_time * 3.5 + particleSeed * 20.0) * 0.007;
    pos += normalize(pos + vec3(0.001)) * shimmer;

    // ─── MVP ──────────────────────────────────────────────────────
    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPos;

    // ─── Point size ───────────────────────────────────────────────
    float depthFade = clamp(7.0 / -mvPos.z, 0.4, 2.4);
    float pulse     = 1.0 - PULSE_AMP + PULSE_AMP * sin(u_time * PULSE_SPEED + particleSeed * 18.0);

    gl_PointSize = (SIZE_BASE + particleSeed * SIZE_VAR) * depthFade * pulse * u_pixelRatio;

    // ─── Dark theme colors ────────────────────────────────────────
    vec3 dark_cyan   = vec3(0.18, 0.92, 1.00);
    vec3 dark_violet = vec3(0.68, 0.42, 1.00);
    vec3 dark_ice    = vec3(0.80, 0.92, 1.00);

    vec3 darkColor = mix(dark_cyan, dark_violet, smoothstep(0.15, 0.90, particleSeed));
    darkColor = mix(darkColor, dark_ice, smoothstep(0.80, 1.0, abs(wave)));

    // ─── Light theme colors ───────────────────────────────────────
    // 彩度・明度を下げてコントラストを強化
    vec3 light_indigo  = vec3(0.25, 0.32, 0.85);   // ディープインディゴ
    vec3 light_violet  = vec3(0.45, 0.22, 0.78);   // ディープバイオレット
    vec3 light_sky     = vec3(0.18, 0.52, 0.90);   // ディープスカイ

    vec3 lightColor = mix(light_indigo, light_violet, smoothstep(0.15, 0.90, particleSeed));
    lightColor = mix(lightColor, light_sky, smoothstep(0.72, 1.0, abs(wave)));

    // ─── Blend by theme ──────────────────────────────────────────
    vColor = mix(darkColor, lightColor, u_theme);

    vSeed = particleSeed;
    vGlow = pulse;
}
