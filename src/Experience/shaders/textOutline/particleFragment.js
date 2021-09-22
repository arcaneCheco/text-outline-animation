const shader = `
uniform float uTime;
uniform vec2 uViewport;
uniform vec4 uResolution;
uniform vec2 uMouse;

float createCircle() {
    // vec2 viewportUv = gl_FragCoord.xy / viewport/pixelratio;
    vec2 viewportUv = gl_FragCoord.xy / uViewport;
    float viewportAspect = uViewport.x / uViewport.y;

    vec2 mousePoint = vec2(uMouse.x, 1.0 - uMouse.y);
    float circleRadius = max(0.0, 100. / uViewport.x);

    vec2 shapeUv = viewportUv - mousePoint;
    shapeUv /= vec2(1.0, viewportAspect);
    shapeUv += mousePoint;

    float dist = distance(shapeUv, mousePoint);
    dist = smoothstep(circleRadius, circleRadius + 0.001, dist);
    return dist;
  }

void main() {
    float circle = 1. - createCircle();
    float dist = length(gl_PointCoord - vec2(0.5));
    dist = smoothstep(0.5,0.45,dist);
    dist *= circle;
    gl_FragColor = vec4(dist);
    if (dist < 0.01) discard;
}`;
export default shader;
