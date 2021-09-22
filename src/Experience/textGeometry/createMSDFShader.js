import * as THREE from "three";
import assign from "object-assign";
import vertexShader from "./outlineVertexShader.js";
import fragmentShader from "./defaultFragmentShader.js";

const createMSDFShader = (opt) => {
  opt = opt || {};
  var opacity = typeof opt.opacity === "number" ? opt.opacity : 1;
  var color = opt.color;
  var map = opt.map;
  let gradientMap = opt.gradientMap;

  // remove to satisfy r73
  delete opt.map;
  delete opt.color;
  delete opt.opacity;
  delete opt.gradientMap;

  return assign(
    {
      uniforms: {
        opacity: { value: opacity },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2() },
        viewport: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        map: { value: map || new THREE.Texture() },
        gradientMap: { value: gradientMap || new THREE.Texture() },
        color: { value: new THREE.Color(color) },
      },
      vertexShader,
      fragmentShader,
    },
    opt
  );
};

export default createMSDFShader;
