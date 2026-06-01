const scenes = document.querySelectorAll(".scene");
const links = document.querySelectorAll(".nav-menu a");
const sidebar = document.querySelector(".sidebar");
const mobileBtn = document.getElementById("mobile-menu-btn");

/* =========================
   SCENES SYSTEM
========================= */

function showScene(id) {
  scenes.forEach(s => s.classList.remove("active"));

  const target = document.querySelector(id);

  if (target) {
    target.classList.add("active");

    const scroll = target.querySelector(".scene-scroll");
    if (scroll) scroll.scrollTop = 0;
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

    if (window.innerWidth < 900 && sidebar) {
      sidebar.style.display = "none";
    }
  });
});

/* INIT */
window.addEventListener("load", () => {
  showScene("#hero");
});

/* MOBILE MENU */
if (mobileBtn) {
  mobileBtn.addEventListener("click", () => {
    if (!sidebar) return;

    const hidden = !sidebar.style.display || sidebar.style.display === "none";

    sidebar.style.display = hidden ? "flex" : "none";
  });
}

/* =========================
   THREE.JS SETUP (FIXED)
========================= */

const canvas = document.getElementById("three-canvas");

let scene, camera, renderer, model;

if (canvas) {

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );

  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /* =========================
     LIGHTS (CRÍTICO PARA VER GLB)
  ========================= */

  const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
  scene.add(hemi);

  const dir = new THREE.DirectionalLight(0xffffff, 2);
  dir.position.set(5, 10, 5);
  scene.add(dir);

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
         CENTRAR MODELO (CRÍTICO)
      ========================= */

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      model.position.sub(center);

      /* =========================
         ESCALA AUTOMÁTICA
      ========================= */

      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.5 / maxDim;
      model.scale.setScalar(scale);

      /* =========================
         CÁMARA BIEN AJUSTADA
      ========================= */

      camera.position.set(0, 0, maxDim * 2.2);
      camera.lookAt(0, 0, 0);

      console.log("GLB OK - visible");
    },

    undefined,

    (err) => {
      console.error("GLB ERROR:", err);
    }
  );

  /* =========================
     ANIMATE
  ========================= */

  function animate() {
    requestAnimationFrame(animate);

    if (model) {
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