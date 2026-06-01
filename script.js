const scenes = document.querySelectorAll(".scene");
const links = document.querySelectorAll(".nav-menu a");

function showScene(id){

  scenes.forEach(scene=>{
    scene.classList.remove("active");
  });

  const target = document.querySelector(id);

  if(target){
    target.classList.add("active");
  }
}

links.forEach(link=>{

  link.addEventListener("click",(e)=>{

    e.preventDefault();

    const target = link.getAttribute("href");

    showScene(target);

  });

});

showScene("#hero");
const container = document.getElementById("trail-container");

let lastX = 0;
let lastY = 0;

const container = document.getElementById("trail-container");

let lastX = 0;
let lastY = 0;

document.addEventListener("mousemove", (e) => {
  const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);

  if (dist > 3) {
    const dot = document.createElement("div");
    dot.className = "trail-dot";

    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";

    container.appendChild(dot);

    setTimeout(() => dot.remove(), 600);

    lastX = e.clientX;
    lastY = e.clientY;
  }
});
