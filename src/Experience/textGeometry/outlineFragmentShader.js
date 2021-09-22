const shader = `#version 300 es
#define varying in
out highp vec4 pc_fragColor;
#define gl_FragColor pc_fragColor
#define gl_FragDepthEXT gl_FragDepth
#define texture2D texture
#define textureCube texture
#define texture2DProj textureProj
#define texture2DLodEXT textureLod
#define texture2DProjLodEXT textureProjLod
#define textureCubeLodEXT textureLod
#define texture2DGradEXT textureGrad
#define texture2DProjGradEXT textureProjGrad
#define textureCubeGradEXT textureGrad
precision highp float;
precision highp int;
uniform float opacity;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 viewport;
uniform vec3 color;
uniform sampler2D map;
uniform sampler2D gradientMap;
varying vec2 vUv;

float median(float r, float g, float b) {
  return max(min(r, g), min(max(r, g), b));
}

float createCircle() {
  // vec2 viewportUv = gl_FragCoord.xy / viewport/pixelratio;
  vec2 viewportUv = gl_FragCoord.xy / viewport;
  float viewportAspect = viewport.x / viewport.y;

  vec2 mousePoint = vec2(uMouse.x, 1.0 - uMouse.y);
  float circleRadius = max(0.0, 100. / viewport.x);

  vec2 shapeUv = viewportUv - mousePoint;
  shapeUv /= vec2(1.0, viewportAspect);
  shapeUv += mousePoint;

  float dist = distance(shapeUv, mousePoint);
  dist = smoothstep(circleRadius, circleRadius + 0.001, dist);
  return dist;
  // return 1.;
  // return uMouse.y;
}

void main() {
  float circle = createCircle();
  float width = 0.1;
  float lineProgress = 0.3;
  vec3 mySample = texture2D(map, vUv).rgb;
  float gr = texture2D(gradientMap, vUv).r;
  float sigDist = median(mySample.r, mySample.g, mySample.b) - 0.5;
  float fill = clamp(sigDist/fwidth(sigDist) + 0.5, 0.0, 1.0);


  // stroke
  float border = fwidth(sigDist);
  float outline = smoothstep(0., border, sigDist);
  outline *= 1. - smoothstep(width - border, width, sigDist);

  // gradient
  float grgr = fract(3. * gr + uTime / 5.);
  float start = smoothstep(0., 0.01, grgr);
  float end = smoothstep(lineProgress, lineProgress - 0.01, grgr);
  float mask = start * end;
  mask = max(0.2, mask);

  float finalAlpha = outline * mask + fill * circle;

  // gl_FragColor = vec4(color.xyz, fill * opacity);
  gl_FragColor = vec4(color.xyz, finalAlpha);
  // gl_FragColor = vec4(vec3(circle), finalAlpha);
  if (gl_FragColor.a < 0.001) discard;
}`;

export default shader;
