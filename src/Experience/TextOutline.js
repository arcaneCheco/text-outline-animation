import * as THREE from "three";
import Experience from "./Experience";
import font from "../msdf.json";
import vertexShader from "./shaders/textOutline/vertex.glsl";
import fragmentShader from "./shaders/textOutline/fragment.glsl";
import createTextGeometry from "../three-bmfont-text/index2.js";
import createMSDFShader from "./msdf";

export default class TextOutline {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.scene = this.experience.scene;
    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.fontTexture = this.resources.items.manifoldFontTexture;
    this.geometry = createTextGeometry({
      text: "hello",
      font: font,
      align: "center",
      flipY: this.fontTexture.flipY,
    });
  }

  setMaterial() {
    this.material = new THREE.RawShaderMaterial(
      createMSDFShader({
        map: this.fontTexture,
        transparent: true,
        color: 0xff0000,
      })
    );
  }

  setMesh() {
    const layout = this.geometry.layout;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.scale.set(0.01, 0.01, 0.01);
    this.scene.add(this.mesh);
    // this.mesh.position.set(0, -layout.descender + layout.height, 0)
    // this.mesh.scale.multiplyScalar(Math.random() * 0.5 + 0.5)
  }

  update() {
    this.mesh.rotation.x = this.time.elapsed * 0.001;
  }
}
