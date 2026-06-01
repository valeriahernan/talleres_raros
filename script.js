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

  // IMPORTANTE: resize canvas cuando cambia escena
  setTimeout(resizeRenderer, 50);
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
   THREE.JS SETUP (FIX REAL)
========================= */

const canvas = document.getElementById("three-canvas");

let scene, camera, renderer, model;

function resizeRenderer() {
  if (!renderer || !camera) return;

  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}

if (canvas) {

  scene = new THREE.Scene();
  scene.background = null;

  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // 🔥 CLAVE: cámara más cerca
  camera.position.set(0, 0, 2.5);

  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /* =========================
     LUCES (ESTO ES CRÍTICO)
  ========================= */

  const ambient = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambient);

  const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
  dirLight.position.set(3, 5, 2);
  scene.add(dirLight);

  const fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
  fillLight.position.set(-3, 2, -2);
  scene.add(fillLight);

  /* =========================
     GLB LOADER
  ========================= */
loader.load(
  "GLB/3Dtalleres.glb",
  (gltf) => {

    model = gltf.scene;

    // 👇 IMPORTANTE: agregar primero al scene
    scene.add(model);

    // 🔥 centrar modelo REAL
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    model.position.x -= center.x;
    model.position.y -= center.y;
    model.position.z -= center.z;

    // 🔥 escala segura (evita invisibilidad)
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2 / maxDim;
    model.scale.setScalar(scale);

    // 🔥 cámara ajustada automáticamente
    camera.position.set(0, 0, maxDim * 2.5);
    camera.lookAt(0, 0, 0);

    console.log("GLB LOADED + VISIBLE FIXED");
  }
);
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
      const scale = 2 / maxDim;
      model.scale.setScalar(scale);

      console.log("GLB OK");
    },

    undefined,

    (err) => console.error("GLB ERROR:", err)
  );

  /* =========================
     ANIMATION LOOP
  ========================= */

  function animate() {
    requestAnimationFrame(animate);

    if (model) {
      model.rotation.y += 0.002;
    }

    renderer.render(scene, camera);
  }

  animate();

  /* RESIZE FIX */
  window.addEventListener("resize", resizeRenderer);
}