global.THREE = require("three");
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl",
  scaleToView: true
};

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;


const sketch = ({ context }) => {
  // RENDERER
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas,
    alpha: true,
  });
  renderer.setClearColor("#02041C", 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // CAMERA
  const camera = new THREE.PerspectiveCamera(100, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1000);
  camera.position.set(0, 5, 50);

  // ORBIT CONTROLS
  const controls = new THREE.OrbitControls(camera, context.canvas);
  controls.target.set(30, 0, 0);

  const loader = new THREE.TextureLoader();
  const scene = new THREE.Scene();
  const geometry = new THREE.SphereGeometry(1, 48, 20);

  // BACKGROND STARS
  const starsGeometry = new THREE.Geometry();
  for ( let i = 0; i < 25000; i ++ ) {
    let star = new THREE.Vector3();
    star.x = THREE.Math.randFloatSpread( 2000 );
    star.y = THREE.Math.randFloatSpread( 2000 );
    star.z = THREE.Math.randFloatSpread( 2000 );
    starsGeometry.vertices.push( star );
  }
  const starsMaterial = new THREE.PointsMaterial( { color: 0xffffff } );
  const stars = new THREE.Points( starsGeometry, starsMaterial );
  scene.add( stars );

  // SUN
  const sunTexture = loader.load("textures/sun.jpg");
  const sunMaterial = new THREE.MeshStandardMaterial({ map: sunTexture });
  const sunMesh = new THREE.Mesh(geometry, sunMaterial);
  const sunContainer = new THREE.Object3D();
  sunContainer.add(sunMesh);
  sunMesh.position.set(0, 0, 0);
  sunMesh.scale.setScalar(10);
  scene.add(sunContainer);

  // PLANETS
  // const mercuryTexture = loader.load("textures/mercury.jpg");
  // const mercuryMaterial = new THREE.MeshLambertMaterial({ map: mercuryTexture });
  // const mercuryContainer = new THREE.Object3D();
  // const mercuryMesh = new THREE.Mesh(geometry, mercuryMaterial);
  // createPlanet(mercuryMesh, mercuryContainer, 25, 0.8, sunContainer);
  //
  // const venusTexture = loader.load("textures/venus.jpg");
  // const venusMaterial = new THREE.MeshLambertMaterial({ map: venusTexture });
  // const venusContainer = new THREE.Object3D();
  // const venusMesh = new THREE.Mesh(geometry, venusMaterial);
  // createPlanet(venusMesh, venusContainer, 30, 0.9, sunContainer);

  const moonTexture = loader.load("textures/moon.jpg");
  const moonMaterial = new THREE.MeshLambertMaterial({ map: moonTexture});
  const moonContainer = new THREE.Object3D();
  const moonMesh = new THREE.Mesh(geometry, moonMaterial);
  moonMesh.castShadow = true;
  moonMesh.receiveShadow = true;
  moonMesh.emissive = new THREE.Color(0xffffff);
  moonMesh.scale.setScalar(0.2);
  moonContainer.add(moonMesh);

  const earthTexture = loader.load("textures/earth.jpg");
  const earthMaterial = new THREE.MeshLambertMaterial({ map: earthTexture});
  const earthContainer = new THREE.Object3D();
  const earthMesh = new THREE.Mesh(geometry, earthMaterial);
  createPlanet(earthMesh, earthContainer, 40, 2, sunContainer);
  earthContainer.add(moonContainer);
  moonContainer.position.set(4, 0, 0);
  // LIGHTING
  const light = new THREE.PointLight("white", 1.25);
  light.position.set(0, 0, 0);
  light.castShadow = true;
  scene.add(light);

  // illuminate the sun
  createSpotlights(scene);

  // draw each frame
  return {

    render({ time }) {
      sunMesh.rotation.y = time * 0.05
      sunContainer.rotation.y = time * 0.05;

      earthContainer.rotation.y = time * 0.4;

      moonContainer.rotation.y = time * 0.1;

      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    }
  };
};

function createPlanet(mesh, container, orbitRelativeToParent, scale, sunContainer) {
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.scale.setScalar(scale);
  container.add(mesh);
  sunContainer.add(container);
  container.position.set(orbitRelativeToParent, 0, 0);
}

function createSpotlights(scene) {
  var color = 0xFFFFFF;
  var intensity = 5;
  var distance = 25;
  var angle = Math.PI/7;

  new Array(6).fill('').forEach((item, i) => {
    var spotlight = new THREE.SpotLight(color, intensity, distance, angle);
    var value = i % 2 === 0 ? 25 : -25;

    spotlight.position.set(
      i < 2 ? value : 0,
      i >= 2 && i < 4 ? value : 0,
      i >= 4 ? value : 0
    );
    scene.add( spotlight );
  });
}

canvasSketch(sketch, settings);
