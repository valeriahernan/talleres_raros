const scenes = document.querySelectorAll(".scene");
const links = document.querySelectorAll(".nav-menu a");
const sidebar = document.querySelector(".sidebar");
const canvas = document.getElementById("three-canvas");

function showScene(id){
  scenes.forEach(s => s.classList.remove("active"));

  const target = document.querySelector(id);
  if(target) target.classList.add("active");

  links.forEach(l => {
    l.classList.toggle("active", l.getAttribute("href") === id);
  });
}

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    showScene(link.getAttribute("href"));
  });
});

window.addEventListener("load", () => {
  showScene("#hero");
});

/* =========================
   THREE JS
========================= */

let scene, camera, renderer, model;

if(canvas){

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth/window.innerHeight,
    0.1,
    100
  );

  camera.position.set(0,0,3);

  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha:true,
    antialias:true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  /* LIGHTS (CRÍTICO) */
  scene.add(new THREE.AmbientLight(0xffffff, 1.2));

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(3,5,5);
  scene.add(light);

  const loader = new THREE.GLTFLoader();

  loader.load(
    "GLB/3Dtalleres.glb",
    (gltf) => {

      model = gltf.scene;
      scene.add(model);

      /* CENTER FIX */
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      model.position.sub(center);

      /* SCALE FIX */
      const maxSize = Math.max(size.x,size.y,size.z);
      model.scale.setScalar(2.5 / maxSize);

      camera.position.set(0,0,maxSize * 2.2);
      camera.lookAt(0,0,0);
    }
  );

  function animate(){
    requestAnimationFrame(animate);

    if(model){
      model.rotation.y += 0.002;
    }

    renderer.render(scene,camera);
  }

  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}