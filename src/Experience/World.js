import Experience from "./Experience.js";
import TextOutline from "./TextOutline.js";
import * as THREE from "three";

export default class World {
  constructor(_options) {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.resources.on("end", () => {
      // this.setDummy();
      this.setTextOutline();
    });
  }

  setDummy() {
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        map: this.resources.items.lennaTexture,
        depthWrite: false,
        depthTest: false,
      })
    );
    this.scene.add(cube);
  }

  setTextOutline() {
    this.textOutline = new TextOutline();
  }

  resize() {}

  update() {
    if (this.textOutline) {
      this.textOutline.update();
    }
  }

  destroy() {}
}
