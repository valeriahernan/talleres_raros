const scenes = document.querySelectorAll(".scene");
const links = document.querySelectorAll(".nav-menu a");
const stage = document.querySelector(".stage");
const sidebar = document.querySelector(".sidebar");
const mobileBtn = document.getElementById("mobile-menu-btn");

/* =========================
   CAMBIO DE ESCENA
========================= */

function showScene(id){

  scenes.forEach(scene => {
    scene.classList.remove("active");
  });

  const target = document.querySelector(id);

  if(target){
    target.classList.add("active");

    // reset scroll interno
    const scroll = target.querySelector(".scene-scroll");
    if(scroll){
      scroll.scrollTop = 0;
    }
  }

  links.forEach(link => {
    link.classList.remove("active");

    if(link.getAttribute("href") === id){
      link.classList.add("active");
    }
  });
}

/* =========================
   CLICK NAV
========================= */

links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const target = link.getAttribute("href");
    showScene(target);

    // cerrar menú mobile
    if(window.innerWidth < 900 && sidebar){
      sidebar.style.display = "none";
    }
  });
});

/* =========================
   INIT
========================= */

window.addEventListener("load", () => {
  showScene("#hero");
});

/* =========================
   MOBILE MENU
========================= */

if(mobileBtn){
  mobileBtn.addEventListener("click", () => {

    if(!sidebar) return;

    const hidden = !sidebar.style.display || sidebar.style.display === "none";

    if(hidden){
      sidebar.style.display = "flex";
      sidebar.style.position = "fixed";
      sidebar.style.top = "60px";
      sidebar.style.left = "0";
      sidebar.style.width = "100%";
      sidebar.style.height = "auto";
      sidebar.style.flexDirection = "row";
      sidebar.style.justifyContent = "space-around";
      sidebar.style.background = "#d6d6d6";
      sidebar.style.zIndex = "99999";
    } else {
      sidebar.style.display = "none";
    }
  });
}

/* =========================
   THREE.JS BASIC SETUP (GLB READY)
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

  camera.position.set(0, 0, 3);

  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /* LIGHTS */
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(2, 3, 5);
  scene.add(dirLight);

  /* LOAD GLB */
  const loader = new THREE.GLTFLoader();

  loader.load("GLB/3Dtalleres.glb", (gltf) => {

    model = gltf.scene;
    scene.add(model);

  });

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