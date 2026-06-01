const scenes = document.querySelectorAll(".scene");
const links = document.querySelectorAll(".nav-menu a");
const sidebar = document.querySelector(".sidebar");
const mobileBtn = document.getElementById("mobile-menu-btn");

/* =========================
   SCENES
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

/* NAV */
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
window.addEventListener("load", () => showScene("#hero"));

/* MOBILE */
if (mobileBtn) {
  mobileBtn.addEventListener("click", () => {
    if (!sidebar) return;

    const hidden = !sidebar.style.display || sidebar.style.display === "none";
    sidebar.style.display = hidden ? "flex" : "none";
  });
}

/* =========================
   THREE.JS
========================= */

const canvas = document.getElementById("three-canvas");

let scene, camera, renderer, model;

if (canvas) {

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    55,
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
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /* =========================
     LIGHTS (IMPORTANTE)
  ========================= */

  scene.add(new THREE.AmbientLight(0xffffff, 1.5));

  const key = new THREE.DirectionalLight(0xffffff, 2);
  key.position.set(5, 10, 5);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xffffff, 0.8);
  fill.position.set(-5, 3, -5);
  scene.add(fill);

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
         AUTO CENTER + SCALE SAFE
      ========================= */

      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      model.position.sub(center);

      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.2 / maxDim;
      model.scale.setScalar(scale);

      /* =========================
         CAMERA FIT REAL (CLAVE)
      ========================= */

      const distance = maxDim * 2.8;

      camera.position.set(0, 0, distance);
      camera.lookAt(0, 0, 0);

      console.log("GLB VISIBLE OK");
    },

    undefined,

    (err) => {
      console.error("GLB ERROR:", err);
    }
  );

  /* =========================
     RENDER LOOP
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
     RESIZE
  ========================= */

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}