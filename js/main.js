import { ARButton } from "https://unpkg.com/three@0.126.0/examples/jsm/webxr/ARButton.js";

let camera, scene, renderer;
let model;
let model2;

init();
function init() {
  const container = document.createElement("div");
  document.body.appendChild(container);

  // 1. Luo scene
  scene = new THREE.Scene();

  // 2. Luo kamera
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );

  // 3. Luo renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  container.appendChild(renderer.domElement);

  // 4. Luo geometriat

  // Donitsi

  const fbxLoader = new THREE.FBXLoader();

  const modelURL = "models/DoughNut_FBX.fbx";
  fbxLoader.load(
    modelURL,
    function (object) {
      model = object;
      model.scale.set(0.003, 0.003, 0.003);
      model.position.set(0, 0.2, -1);
      scene.add(model);
      console.log("MODEL: ", model);
    },
    function (xhr) {
      console.log(xhr);
    },
    function (error) {
      console.error(error);
    },
  );

  // Kaukosäädin (oma malli)
  const modelURL2 = "models/remote.fbx";
  fbxLoader.load(
    modelURL2,
    function (object) {
      object.scale.set(0.03, 0.03, 0.03);
      object.position.set(0, -0.2, -1);
      scene.add(object);
      model2 = object;
      console.log("MODEL 2: ", object);
    },
    function (xhr) {
      console.log(xhr);
    },
    function (error) {
      console.error(error);
    },
  );

  // 5. Lisää valo sceneen

  const light = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
  light.position.set(1, 1, 0.25);
  scene.add(light);

  animate();
  function animate() {
    renderer.setAnimationLoop(render);
  }

  function render() {
    rotate();
    renderer.render(scene, camera);
  }

  let rot = 0;
  function rotate() {
    rot += 0.3;
    if (model !== undefined) {
      model.rotation.x = THREE.MathUtils.degToRad(rot);
    }
    if (model2 !== undefined) {
      model2.rotation.z = THREE.MathUtils.degToRad(rot);
      model2.rotation.x = THREE.MathUtils.degToRad(rot);
    }
  }

  const button = ARButton.createButton(renderer);
  document.body.appendChild(button);
}
