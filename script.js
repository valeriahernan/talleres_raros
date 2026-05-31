const scenes = document.querySelectorAll(".scene");
const links = document.querySelectorAll(".nav-menu a");

function showScene(id){
  scenes.forEach(scene => scene.classList.remove("active"));
  const target = document.querySelector(id);
  if(target) target.classList.add("active");
}

links.forEach(link=>{
  link.addEventListener("click",(e)=>{
    e.preventDefault();
    showScene(link.getAttribute("href"));
  });
});

showScene("#hero");
