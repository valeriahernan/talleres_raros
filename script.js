const scenes = document.querySelectorAll(".scene");
const links = document.querySelectorAll(".nav-menu a");

function show(id){
  scenes.forEach(s => s.classList.remove("active"));
  document.querySelector(id).classList.add("active");
}

links.forEach(l=>{
  l.addEventListener("click", e=>{
    e.preventDefault();
    show(l.getAttribute("href"));
  });
});

show("#hero");