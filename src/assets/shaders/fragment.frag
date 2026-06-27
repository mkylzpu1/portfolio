precision mediump float;

varying float vSeed;
varying float vGlow;
varying vec3 vColor;

uniform mediump float u_theme; /* 0.0 = dark, 1.0 = light */

void main() {
    vec2  coord = gl_PointCoord - vec2(0.5);
    float dist  = length(coord);

    if (dist > 0.5) discard;

    // Soft disk with halo
    float core  = smoothstep(0.24, 0.0,  dist);
    float halo  = smoothstep(0.50, 0.10, dist) * 0.35;

    // Subtle sparkle on brightest seeds only
    float sparkle = smoothstep(0.90, 1.0, fract(vSeed * 43.0)) * core * 0.6;

    // ライトモードはアルファを上げて視認性を確保しつつ柔らかさを維持
    float darkAlpha  = (core + halo + sparkle) * (0.38 + vGlow * 0.38);
    float lightAlpha = (core + halo * 0.9 + sparkle * 0.7) * (0.62 + vGlow * 0.38);

    float alpha = mix(darkAlpha, lightAlpha, u_theme);

    gl_FragColor = vec4(vColor * (0.70 + core * 1.10), alpha);
}
