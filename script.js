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

    const scroll = target.querySelector(".scene-scroll");
    if(scroll) scroll.scrollTop = 0;
  }

  links.forEach(l => {
    l.classList.toggle("active", l.getAttribute("href") === id);
  });
}

/* NAV CLICK */
links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    showScene(link.getAttribute("href"));

    if(window.innerWidth < 900 && sidebar){
      sidebar.style.display = "none";
    }
  });
});

/* INIT */
window.addEventListener("load", () => showScene("#hero"));

/* MOBILE MENU */
if(mobileBtn){
  mobileBtn.addEventListener("click", () => {
    if(!sidebar) return;

    const hidden = !sidebar.style.display || sidebar.style.display === "none";
    sidebar.style.display = hidden ? "flex" : "none";
  });
}

/* =========================
   THREE.JS SETUP
========================= */

const canvas = document.getElementById("three-canvas");

let scene, camera, renderer, model;

if(canvas){

  /* SCENE */
  scene = new THREE.Scene();

  /* CAMERA */
  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );

  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, 0);

  /* RENDERER */
  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  renderer.setClearColor(0x000000, 0);

  /* LIGHTS */
  scene.add(new THREE.AmbientLight(0xffffff, 1.5));

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(5, 5, 5);
  scene.add(light);

  /* HELPER (DEBUG opcional) */
  // scene.add(new THREE.AxesHelper(5));

  /* =========================
     GLTF LOADER
  ========================= */

  const loader = new THREE.GLTFLoader();

  loader.load(
    "GLB/3Dtalleres.glb",

    (gltf) => {

      model = gltf.scene;
      scene.add(model);

      /* =========================
         CENTER MODEL (CRÍTICO)
      ========================= */

      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      model.position.sub(center);

      /* =========================
         SCALE AUTO FIX
      ========================= */

      const maxSize = Math.max(size.x, size.y, size.z);
      const scale = 2.5 / maxSize;

      model.scale.set(scale, scale, scale);

      /* RE-ENCADRE FINAL */
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);

      console.log("GLB LOADED OK");
    },

    undefined,

    (err) => {
      console.error("GLB ERROR:", err);
    }
  );

  /* =========================
     ANIMATION LOOP
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
     RESIZE
  ========================= */

  window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

  });
}