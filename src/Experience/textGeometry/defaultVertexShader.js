const shader = `#version 300 es
#define attribute in
#define varying out
#define texture2D texture
precision highp float;
precision highp int;
#define HIGH_PRECISION
#define SHADER_NAME ShaderMaterial
#define VERTEX_TEXTURES
attribute vec2 uv;
attribute vec4 position;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * position;
}`;

export default shader;
