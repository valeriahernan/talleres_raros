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

/* NAV */
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

/* MOBILE */
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

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );

  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /* LIGHTS */
  scene.add(new THREE.AmbientLight(0xffffff, 1.5));

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(5, 5, 5);
  scene.add(light);

  /* =========================
     GLTF LOADER (CORRECTO)
  ========================= */

  const loader = new THREE.GLTFLoader();

  loader.load(
    "GLB/3Dtalleres.glb",
    (gltf) => {

      model = gltf.scene;
      scene.add(model);

      /* CENTER */
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      model.position.sub(center);

      /* SCALE */
      const maxSize = Math.max(size.x, size.y, size.z);
      model.scale.setScalar(2.5 / maxSize);

      console.log("GLB LOADED OK");
    },
    undefined,
    (err) => {
      console.error("GLB ERROR:", err);
    }
  );

  /* ANIMATE */
  function animate(){

    requestAnimationFrame(animate);

    if(model){
      model.rotation.y += 0.002;
    }

    renderer.render(scene, camera);
  }

  animate();

  /* RESIZE */
  window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

  });
}