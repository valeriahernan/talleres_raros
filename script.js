const scenes = document.querySelectorAll(".scene");
const links = document.querySelectorAll(".nav-menu a");

function show(id){

  scenes.forEach(s => s.classList.remove("active"));

  const target = document.querySelector(id);
  if(target) target.classList.add("active");

}

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    show(link.getAttribute("href"));
  });
});

show("#hero");