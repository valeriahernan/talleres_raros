
const gallery = document.getElementById("gallery");
for(let i=1;i<=9;i++){
  const img = document.createElement("img");
  img.src = `images/d${i}.png`;
  gallery.appendChild(img);
}
