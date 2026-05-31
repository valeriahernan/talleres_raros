const scenes = document.querySelectorAll(".scene");
const links = document.querySelectorAll(".nav-menu a");
const stage = document.querySelector(".stage");
const sidebar = document.querySelector(".sidebar");
const mobileBtn = document.getElementById("mobile-menu-btn");

/* =========================
   SHADERS (NO USADOS AÚN, SOLO LISTOS)
========================= */

const vertexShader = `
uniform vec2 uMouse;
uniform float uTime;

varying vec2 vUv;

void main() {
  vUv = uv;

  vec3 pos = position;

  float dist = distance(uv, uMouse);

  float ripple = sin(dist * 20.0 - uTime * 5.0);

  float effect = exp(-dist * 8.0) * ripple * 0.15;

  pos += normal * effect;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;

void main() {
  gl_FragColor = vec4(0.73, 0.49, 1.0, 1.0);
}
`;

/* =========================
   UNIFORMS (LISTO PARA FUTURO RIPPLE)
========================= */

const uniforms = {
  uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  uTime: { value: 0 }
};

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

    const scroll = target.querySelector(".scene-scroll");
    if(scroll) scroll.scrollTop = 0;
  }

  links.forEach(link => {
    link.classList.remove("active");

    if(link.getAttribute("href") === id){
      link.classList.add("active");
    }
  });
}

/* =========================
   NAV CLICK
========================= */

links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    showScene(link.getAttribute("href"));

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

  camera.position.set(0, 0, 5); // 🔥 MÁS SEGURO PARA VER MODELO

  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /* =========================
     LIGHTS (NECESARIAS)
  ========================= */

  scene.add(new THREE.AmbientLight(0xffffff, 1.2));

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(5, 5, 5);
  scene.add(light);

  /* =========================
     LOAD GLB
  ========================= */
  
loader.load(
  "GLB/3Dtalleres.glb",
  (gltf) => {

    model = gltf.scene;

    console.log("GLB CARGADO OK");

    /* 🔥 CALCULAR CENTRO REAL DEL MODELO */
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    /* mover al centro */
    model.position.x -= center.x;
    model.position.y -= center.y;
    model.position.z -= center.z;

    /* 🔥 ajustar escala automática */
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2 / maxDim;
    model.scale.setScalar(scale);

    scene.add(model);

  },
  undefined,
  (error) => {
    console.error("ERROR GLB:", error);
  }
);

  /* =========================
     MOUSE INTERACTION (LISTO FUTURO RIPPLE)
  ========================= */

  window.addEventListener("mousemove", (e) => {

    uniforms.uMouse.value.x = e.clientX / window.innerWidth;
    uniforms.uMouse.value.y = 1.0 - (e.clientY / window.innerHeight);

  });

  /* =========================
     ANIMATE
  ========================= */

  function animate(){

    requestAnimationFrame(animate);

    uniforms.uTime.value += 0.02;

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