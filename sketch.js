// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
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

  // CAMERA
  const camera = new THREE.PerspectiveCamera(100, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1000);
  camera.position.set(30, 5, 35);

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
  sunMesh.position.set(0, 0, 0);
  sunMesh.scale.setScalar(10);
  scene.add(sunMesh);

  // PLANETS
  const mercuryTexture = loader.load("textures/mercury.jpg");
  const mercuryMaterial = new THREE.MeshPhongMaterial({ map: mercuryTexture });
  const mercuryGroup = new THREE.Group();
  const mercuryMesh = new THREE.Mesh(geometry, mercuryMaterial);
  createPlanet(scene, mercuryMesh, mercuryGroup, 25, 0.8);

  const venusTexture = loader.load("textures/venus.jpg");
  const venusMaterial = new THREE.MeshPhongMaterial({ map: venusTexture });
  const venusGroup = new THREE.Group();
  const venusMesh = new THREE.Mesh(geometry, venusMaterial);
  createPlanet(scene, venusMesh, venusGroup, 28, 0.9);

  const earthTexture = loader.load("textures/earth.jpg");
  const earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture});
  const earthGroup = new THREE.Group();
  const earthMesh = new THREE.Mesh(geometry, earthMaterial);
  createPlanet(scene, earthMesh, earthGroup, 31, 1);

  const moonTexture = loader.load("textures/moon.jpg");
  const moonMaterial = new THREE.MeshPhongMaterial({ map: moonTexture});
  const moonGroup = new THREE.Group();
  const moonMesh = new THREE.Mesh(geometry, moonMaterial);
  createPlanet(earthGroup, moonMesh, moonGroup, 33, 0.3);

  const marsTexture = loader.load("textures/mars.jpg");
  const marsMaterial = new THREE.MeshPhongMaterial({ map: marsTexture });
  const marsGroup = new THREE.Group();
  const marsMesh = new THREE.Mesh(geometry, marsMaterial);
  createPlanet(scene, marsMesh, marsGroup, 37, 0.8);

  const jupiterTexture = loader.load("textures/jupiter.jpg");
  const jupiterMaterial = new THREE.MeshPhongMaterial({ map: jupiterTexture });
  const jupiterGroup = new THREE.Group();
  const jupiterMesh = new THREE.Mesh(geometry, jupiterMaterial);
  createPlanet(scene, jupiterMesh, jupiterGroup, 45, 3.5);

  const saturnTexture = loader.load("textures/saturn.jpg");
  const saturnMaterial = new THREE.MeshPhongMaterial({ map: saturnTexture });
  const saturnGroup = new THREE.Group();
  const saturnMesh = new THREE.Mesh(geometry, saturnMaterial);
  createPlanet(scene, saturnMesh, saturnGroup, 54, 2.9);

  const uranusTexture = loader.load("textures/uranus.jpg");
  const uranusMaterial = new THREE.MeshPhongMaterial({ map: uranusTexture });
  const uranusGroup = new THREE.Group();
  const uranusMesh = new THREE.Mesh(geometry, uranusMaterial);
  createPlanet(scene, uranusMesh, uranusGroup, 60, 1.7);

  const neptuneTexture = loader.load("textures/neptune.jpg");
  const neptuneMaterial = new THREE.MeshPhongMaterial({ map: neptuneTexture });
  const neptuneGroup = new THREE.Group();
  const neptuneMesh = new THREE.Mesh(geometry, neptuneMaterial);
  createPlanet(scene, neptuneMesh, neptuneGroup, 65, 1.65);

  const plutoTexture = loader.load("textures/pluto.jpeg");
  const plutoMaterial = new THREE.MeshPhongMaterial({ map: plutoTexture });
  const plutoGroup = new THREE.Group();
  const plutoMesh = new THREE.Mesh(geometry, plutoMaterial);
  createPlanet(scene, plutoMesh, plutoGroup, 70, 0.5);

  // LIGHTING
  const light = new THREE.PointLight("white", 1.25);
  light.position.set(0, 0, 0);
  scene.add(light);

  // illuminate the sun
  createSpotlights(scene);

  // draw each frame
  return {

    render({ time }) {
      sunMesh.rotation.y = time * 0.05

      mercuryGroup.rotation.y = time * 0.5;
      mercuryMesh.rotation.y = time * 0.20;

      venusGroup.rotation.y = time * 0.35;
      venusMesh.rotation.y = time * 0.18;

      earthGroup.rotation.y = time * 0.3;
      earthMesh.rotation.y = time * 0.15;

      //moonGroup.rotation.y = time * 0.3;
      moonMesh.rotation.y = time * 0.1;

      marsGroup.rotation.y = time * 0.2;
      marsMesh.rotation.y = time * 0.2;

      jupiterGroup.rotation.y = time * 0.05;
      jupiterMesh.rotation.y = time * 0.05;

      saturnGroup.rotation.y = time * 0.03;
      saturnMesh.rotation.y = time * 0.25;

      uranusGroup.rotation.y = time * 0.02;
      uranusMesh.rotation.y = time * 0.25;

      neptuneGroup.rotation.y = time * 0.015;
      neptuneMesh.rotation.y = time * 0.25;

      plutoGroup.rotation.y = time * 0.005;
      plutoMesh.rotation.y = time * 0.2;

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

function createPlanet(scene, mesh, group, x, scale) {
  mesh.position.set(x, 0, 0);
  mesh.scale.setScalar(scale);
  group.add(mesh);
  scene.add(group);
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
