import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export default class Loader {
  constructor() {
    this.items = {};
    this.setLoaders();
  }
  setLoaders() {
    this.loaders = {};

    const loadingManager = new THREE.LoadingManager(
      //loaded
      () => {},
      // progress
      (itemsUrl, itemsLoaded, itemsTotal) => {
        const progressRatio = itemsLoaded / itemsTotal;
      }
    );

    const textureLoader = new THREE.TextureLoader(loadingManager);
    this.loaders.texture = (_asset) => {
      textureLoader.load(_asset.source, (_data) => {
        this.fileLoadEnd(_asset, _data);
      });
    };

    const dracoLoader = new DRACOLoader(loadingManager);
    dracoLoader.setDecoderPath("/draco");
    dracoLoader.setDecoderConfig({ type: "js" });

    const gltfLoader = new GLTFLoader(loadingManager);
    gltfLoader.setDRACOLoader(dracoLoader);
    this.loaders.model = (_asset) => {
      gltfLoader.load(_asset.source, (_data) => {
        this.fileLoadEnd(_asset, _data);
      });
    };
  }
  fileLoadEnd(_resource, _data) {
    this.items[_resource.name] = _data;
  }
}
