const shader = `

void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
    gl_PointSize = 20.;
}`;

export default shader;
