const scenes = document.querySelectorAll(".scene");
const links = document.querySelectorAll(".nav-menu a");
const sidebar = document.querySelector(".sidebar");
const canvas = document.getElementById("three-canvas");

function showScene(id){
  scenes.forEach(s => s.classList.remove("active"));
  const target = document.querySelector(id);
  if(target) target.classList.add("active");

  links.forEach(l =>
    l.classList.toggle("active", l.getAttribute("href") === id)
  );
}

links.forEach(l => {
  l.addEventListener("click", e => {
    e.preventDefault();
    showScene(l.getAttribute("href"));
  });
});

window.addEventListener("load", () => showScene("#hero"));

/* MOBILE MENU SIMPLE */
const btn = document.getElementById("mobile-menu-btn");

if(btn){
  btn.onclick = () => {
    sidebar.style.display =
      sidebar.style.display === "none" ? "flex" : "none";
  };
}

/* THREE JS */
let scene, camera, renderer, model;

if(canvas){

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 1000);
  camera.position.set(0,0,4);

  renderer = new THREE.WebGLRenderer({canvas, alpha:true});
  renderer.setSize(innerWidth, innerHeight);

  scene.add(new THREE.AmbientLight(0xffffff, 1.5));

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(5,5,5);
  scene.add(light);

  const loader = new THREE.GLTFLoader();

  loader.load("GLB/3Dtalleres.glb", (gltf) => {

    model = gltf.scene;
    scene.add(model);

    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    model.position.sub(center);

    const max = Math.max(size.x,size.y,size.z);
    model.scale.setScalar(2.5/max);

    camera.position.z = max * 2.2;
  });

  function animate(){
    requestAnimationFrame(animate);
    if(model) model.rotation.y += 0.002;
    renderer.render(scene,camera);
  }

  animate();

  addEventListener("resize", () => {
    camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });
}