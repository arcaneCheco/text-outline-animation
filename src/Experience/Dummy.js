import * as THREE from "three";
import Experience from "./Experience";

export class Dummy {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.scene = this.experience.scene;
    this.setComp();
  }

  setComp() {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ map: this.resources.items.lennaTexture })
    );
    this.scene.add(this.mesh);
    this.portalModel = this.resources.items.portal;
    this.scene.add(this.portalModel.scene);
    const material = new THREE.MeshBasicMaterial({
      map: this.resources.items.uvTexture,
    });
    this.portalModel.scene.children.forEach(
      (child) => (child.material = material)
    );
  }
  update() {
    this.mesh.rotation.x = this.time.elapsed * 0.001;
  }
}
