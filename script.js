const sections = document.querySelectorAll(".section");
const links = document.querySelectorAll(".nav-menu a");

function setScene(id){

  sections.forEach(s => s.classList.remove("active"));

  const target = document.querySelector(id);
  if(target) target.classList.add("active");

  links.forEach(l => l.classList.remove("active"));

  const active = document.querySelector(`.nav-menu a[href="${id}"]`);
  if(active) active.classList.add("active");
}

setScene("#hero");

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    setScene(link.getAttribute("href"));
  });
});