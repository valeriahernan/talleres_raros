const scenes = document.querySelectorAll(".scene");
const links = document.querySelectorAll(".nav-menu a");
const sidebar = document.querySelector(".sidebar");
const mobileBtn = document.getElementById("mobile-menu-btn");

/* =========================
   SCENES
========================= */

function showScene(id){

  scenes.forEach(s => s.classList.remove("active"));

  const target = document.querySelector(id);
  if(target){
    target.classList.add("active");
  }

  links.forEach(l => {
    l.classList.toggle("active", l.getAttribute("href") === id);
  });
}

links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    showScene(link.getAttribute("href"));

    if(window.innerWidth < 900){
      sidebar.style.display = "none";
    }
  });
});

window.addEventListener("load", () => showScene("#hero"));

/* =========================
   THREE.JS
========================= */

const canvas = document.getElementById("three-canvas");

let scene, camera, renderer, model;

if(canvas){

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  /* =========================
     LUCES (ESTO ES CLAVE)
  ========================= */

  scene.add(new THREE.AmbientLight(0xffffff, 1.5));

  const keyLight = new THREE.DirectionalLight(0xffffff, 2);
  keyLight.position.set(3, 5, 2);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
  fillLight.position.set(-3, 1, -2);
  scene.add(fillLight);

  const backLight = new THREE.DirectionalLight(0xffffff, 0.6);
  backLight.position.set(0, -3, -3);
  scene.add(backLight);

  /* =========================
     LOAD GLB
  ========================= */

  const loader = new THREE.GLTFLoader();

  loader.load(
    "GLB/3Dtalleres.glb",

    (gltf) => {

      model = gltf.scene;
      scene.add(model);

      /* =========================
         FIT PERFECTO (CRÍTICO)
      ========================= */

      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      model.position.sub(center);

      const maxSize = Math.max(size.x, size.y, size.z);

      model.scale.setScalar(2.2 / maxSize);

      /* =========================
         CAMERA AUTO FIT (ESTO TE FALTABA)
      ========================= */

      camera.position.set(0, 0, maxSize * 1.8);
      camera.lookAt(0, 0, 0);

      console.log("GLB VISIBLE OK");
    },

    undefined,
    (err) => console.error(err)
  );

  /* =========================
     ANIMATION
  ========================= */

  function animate(){
    requestAnimationFrame(animate);

    if(model){
      model.rotation.y += 0.002;
    }

    renderer.render(scene, camera);
  }

  animate();

  /* =========================
     RESIZE FIX
  ========================= */

  window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

  });
}