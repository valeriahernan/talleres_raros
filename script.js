const scenes = document.querySelectorAll(".scene");
const links = document.querySelectorAll(".nav-menu a");

function showScene(id){

  scenes.forEach(s => s.classList.remove("active"));

  const target = document.querySelector(id);

  if(target){
    target.classList.add("active");

    const scroll = target.querySelector(".scene-scroll");
    if(scroll) scroll.scrollTop = 0;
  }

  links.forEach(l => {
    l.classList.remove("active");
    if(l.getAttribute("href") === id){
      l.classList.add("active");
    }
  });
}

links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    showScene(link.getAttribute("href"));
  });
});

showScene("#hero");