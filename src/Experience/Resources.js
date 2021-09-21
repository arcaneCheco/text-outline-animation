import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import EventEmitter from "./Utils/EventEmitter";

export default class Resources extends EventEmitter {
  constructor(_assets) {
    super();
    this.assets = _assets;
    this.toLoad = this.assets.length;
    this.loaded = 0;
    this.items = {};
    this.setLoaders();
    this.load();
  }

  setLoaders() {
    this.loaders = {};

    const loadingManager = new THREE.LoadingManager();

    loadingManager.onLoad = this.onFinish;
    loadingManager.onProgress = this.onLoading;

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

  fileLoadEnd(_asset, _data) {
    this.loaded++;
    this.items[_asset.name] = _data;
    if (this.loaded === this.toLoad) {
      this.emit("end");
    }
  }

  onFinish() {
    // console.log("done loading");
  }

  onLoading(itemsUrl, itemsLoaded, itemsTotal) {
    // const progressRatio = itemsLoaded / itemsTotal;
    // console.log(progressRatio);
  }

  load() {
    this.assets.forEach((_asset) => {
      this.loaders[_asset.type](_asset);
    });
  }
}
