const isMobile=window.matchMedia("(hover:none),(pointer:coarse),(max-width:900px)").matches;

/* ELEMENTOS */
const scenes=document.querySelectorAll(".scene");
const links=document.querySelectorAll(".nav-menu a");
const sidebar=document.querySelector(".sidebar");
const mobileBtn=document.getElementById("mobile-menu-btn");
const desktopToggle=document.getElementById("menuToggle");

/* SCENES */
function showScene(id){
scenes.forEach(scene=>scene.classList.remove("active"));
const target=document.querySelector(id);
if(target)target.classList.add("active");
}

links.forEach(link=>{
link.addEventListener("click",e=>{
e.preventDefault();
showScene(link.getAttribute("href"));
sidebar?.classList.remove("active");
sidebar?.classList.remove("open");
});
});

/* MOBILE MENU */
if(mobileBtn&&sidebar){
mobileBtn.addEventListener("click",e=>{
e.stopPropagation();
sidebar.classList.toggle("active");
});
}

/* DESKTOP MENU */
if(desktopToggle&&sidebar){
desktopToggle.addEventListener("click",e=>{
e.stopPropagation();
sidebar.classList.toggle("open");
});
}

/* CLOSE MENU */
document.addEventListener("keydown",e=>{
if(e.key==="Escape"){
sidebar?.classList.remove("active");
sidebar?.classList.remove("open");
}
});

document.addEventListener("click",e=>{
if(window.innerWidth<=900&&sidebar?.classList.contains("active")){
if(!sidebar.contains(e.target)&&e.target!==mobileBtn){
sidebar.classList.remove("active");
}
}
});


/* HERO LETTERS */
document.addEventListener("DOMContentLoaded",()=>{

const letters=document.querySelectorAll(".hero-title span");

if(!letters.length||isMobile)return;

let mouse={
x:window.innerWidth/2,
y:window.innerHeight/2
};

let isScatter=false;

const states=Array.from(letters).map(letter=>({
el:letter,
x:0,
y:0,
rot:0,
scale:1,
tx:0,
ty:0,
trot:0,
tscale:1
}));

document.addEventListener("mousemove",e=>{
mouse.x=e.clientX;
mouse.y=e.clientY;
});


function scatterLetters(){

isScatter=true;

states.forEach(state=>{

state.tx=(Math.random()-0.5)*120;
state.ty=(Math.random()-0.5)*60;
state.trot=(Math.random()-0.5)*50;
state.tscale=1;

});

}


function resetLetters(){

isScatter=false;

states.forEach(state=>{

state.tx=0;
state.ty=0;
state.trot=0;
state.tscale=1;

});

}


document.querySelector(".hero-title")?.addEventListener("click",()=>{

if(!isScatter)scatterLetters();
else resetLetters();

});


function animate(){

states.forEach(state=>{

const rect=state.el.getBoundingClientRect();

if(!isScatter){

const dx=rect.left+rect.width/2-mouse.x;
const dy=rect.top+rect.height/2-mouse.y;

const dist=Math.sqrt(dx*dx+dy*dy);

const maxDist=180;

if(dist<maxDist){

const force=1-dist/maxDist;

state.tx=dx*force*.35;
state.ty=dy*force*.35;
state.trot=state.tx*.6;
state.tscale=1+force*.2;

}else{

state.tx*=.9;
state.ty*=.9;
state.trot*=.9;
state.tscale=1;

}

}


state.x+=(state.tx-state.x)*.08;
state.y+=(state.ty-state.y)*.08;
state.rot+=(state.trot-state.rot)*.08;
state.scale+=(state.tscale-state.scale)*.08;


state.el.style.transform=`
translate(${state.x}px,${state.y}px)
rotate(${state.rot}deg)
scale(${state.scale})
`;

});


requestAnimationFrame(animate);

}

animate();

});

/* LANGUAGE */

let currentLang="es";
const btn=document.getElementById("langBtn");

function setLanguage(lang){

document.querySelectorAll("[data-es]").forEach(el=>{

const text=el.getAttribute(`data-${lang}`);

if(text)el.textContent=text;

});

if(btn){
btn.textContent=lang==="es"?"EN":"ES";
}

currentLang=lang;

localStorage.setItem("lang",lang);

}


btn?.addEventListener("click",()=>{

setLanguage(currentLang==="es"?"en":"es");

});


document.addEventListener("DOMContentLoaded",()=>{

const saved=localStorage.getItem("lang");

if(saved)setLanguage(saved);

});



/* CURSOR EFFECT */

const cursor=document.querySelector(".custom-cursor");

const symbols=[
"♫","⋆","｡","♪","𝄢˚","♬","ﾟ","❀",
"♫","⋆","✴︎","♪","✧˚","♬","✴︎","✩"
];


if(cursor&&!isMobile){

let lastTime=0;
const delay=90;


document.addEventListener("mousemove",e=>{

cursor.style.left=e.clientX+"px";
cursor.style.top=e.clientY+"px";


const now=Date.now();

if(now-lastTime>delay){

createDrop(e.clientX,e.clientY);
lastTime=now;

}

});


function createDrop(x,y){

const el=document.createElement("div");

el.textContent=symbols[Math.floor(Math.random()*symbols.length)];

el.style.position="fixed";
el.style.left=x+"px";
el.style.top=y+"px";
el.style.fontSize=(Math.random()*16+10)+"px";
el.style.color=randomColor();
el.style.pointerEvents="none";
el.style.zIndex="99998";
el.style.transform="translate(-50%,-50%)";


document.body.appendChild(el);


let posX=x;
let posY=y;

const drift=(Math.random()-.5)*.2;
const speed=Math.random()*.8+.3;

let opacity=1;


function fall(){

posY+=speed;
posX+=drift;

opacity*=.95;

el.style.top=posY+"px";
el.style.left=posX+"px";
el.style.opacity=opacity;


if(opacity>0&&posY<window.innerHeight+200){

requestAnimationFrame(fall);

}else{

el.remove();

}

}

requestAnimationFrame(fall);

}


function randomColor(){

const colors=[
"#ba7dff",
"#8f7bffbb"
];

return colors[Math.floor(Math.random()*colors.length)];

}

}

/* HERO VIDEO */

const video=document.getElementById("heroVideo");

if(video){

video.pause();
video.currentTime=0;


video.addEventListener("pointerdown",()=>{

video.currentTime=0;
video.play();

});


video.addEventListener("ended",()=>{

video.pause();
video.currentTime=0;

});

}


/* SCROLL TOP BUTTON */

const scrollBtn=document.getElementById("scrollTopBtn");


if(scrollBtn){

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

scrollBtn.classList.add("visible");

}else{

scrollBtn.classList.remove("visible");

}

});


scrollBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,
behavior:"smooth"

});

});

}


/* ACTIVE SCENE ON LOAD */

document.addEventListener("DOMContentLoaded",()=>{

const firstScene=document.querySelector(".scene");

if(firstScene&&!document.querySelector(".scene.active")){

firstScene.classList.add("active");

}

});


/* PREVENT VIDEO DRAG */

if(video){

video.addEventListener("dragstart",e=>{

e.preventDefault();

});

}


/* RESIZE CHECK */

window.addEventListener("resize",()=>{

const mobileNow=window.matchMedia(
"(hover:none),(pointer:coarse),(max-width:900px)"
).matches;


if(mobileNow!==isMobile){

location.reload();

}

});

const talleres=document.querySelectorAll(".taller-item");

talleres.forEach(taller=>{
taller.addEventListener("click",()=>{
taller.classList.toggle("active");
});
});



/*SCROLL PARA ARRIBA*//* 
========================= */

const scrollTopBtn = document.getElementById("scrollTopBtn");

if(scrollTopBtn){

window.addEventListener("scroll",()=>{

    if(window.scrollY > 500){
        scrollTopBtn.classList.add("visible");
    }else{
        scrollTopBtn.classList.remove("visible");
    }

});


scrollTopBtn.addEventListener("click",()=>{

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});

}

/* =========================
   VIDEO CONTROL MOUSE
========================= */

const heroVideo = document.getElementById("heroVideo");

if(heroVideo){

let mouseTimer;
let isPlaying = false;


document.addEventListener("mousemove",()=>{


    // si estaba pausado, reproducir
    if(!isPlaying){

        heroVideo.play();
        isPlaying = true;

    }


    // reiniciar contador de quietud
    clearTimeout(mouseTimer);


    mouseTimer = setTimeout(()=>{

        heroVideo.pause();
        isPlaying = false;

    },500);


});


}