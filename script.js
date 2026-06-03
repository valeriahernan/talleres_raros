
/* =========================
   CLICK FIX (safe)
========================= */
document.addEventListener("click", () => {}, { passive: true });

/* =========================
   SCENES SYSTEM
========================= */
const scenes = document.querySelectorAll(".scene");
const links = document.querySelectorAll(".nav-menu a");
const sidebar = document.querySelector(".sidebar");

function showScene(id) {
  scenes.forEach(scene => scene.classList.remove("active"));
  const target = document.querySelector(id);
  if (target) target.classList.add("active");
}

links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    showScene(link.getAttribute("href"));

    if (window.innerWidth <= 900) {
      sidebar?.classList.remove("active");
    }
  });
});

/* =========================
   MOBILE MENU
========================= */
const mobileBtn = document.getElementById("mobile-menu-btn");

if (mobileBtn && sidebar) {
  mobileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    sidebar.classList.toggle("active");
  });
}

/* =========================
   CLOSE SIDEBAR EVENTS
========================= */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sidebar?.classList.contains("active")) {
    sidebar.classList.remove("active");
  }
});

document.addEventListener("click", (e) => {
  if (window.innerWidth <= 900 && sidebar?.classList.contains("active")) {
    if (!sidebar.contains(e.target) && e.target !== mobileBtn) {
      sidebar.classList.remove("active");
    }
  }
});

/* =========================
   HERO TEXT REACTION (SMOOTH LERP)
========================= */
window.addEventListener("DOMContentLoaded", () => {
  const letters = document.querySelectorAll(".hero-title span");
  if (!letters.length) return;

  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  const states = Array.from(letters).map(letter => ({
    el: letter,
    x: 0,
    y: 0,
    rot: 0,
    scale: 1,
    tx: 0,
    ty: 0,
    trot: 0,
    tscale: 1
  }));

  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function animate() {
    states.forEach(state => {
      const rect = state.el.getBoundingClientRect();

      const lx = rect.left + rect.width / 2;
      const ly = rect.top + rect.height / 2;

      const dx = lx - mouse.x;
      const dy = ly - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const maxDist = 180;

      if (dist < maxDist) {
        const force = 1 - dist / maxDist;

        state.tx = dx * force * 0.35;
        state.ty = dy * force * 0.35;
        state.trot = state.tx * 0.6;
        state.tscale = 1 + force * 0.2;
      } else {
        state.tx = 0;
        state.ty = 0;
        state.trot = 0;
        state.tscale = 1;
      }

      state.x += (state.tx - state.x) * 0.1;
      state.y += (state.ty - state.y) * 0.1;
      state.rot += (state.trot - state.rot) * 0.1;
      state.scale += (state.tscale - state.scale) * 0.1;

      state.el.style.transform = `
        translate(${state.x}px, ${state.y}px)
        rotate(${state.rot}deg)
        scale(${state.scale})
      `;
    });

    requestAnimationFrame(animate);
  }

  animate();
});

/* =========================
   RAINBOW CURSOR (FIXED + STABLE)
========================= */
window.addEventListener("load", () => {
  setTimeout(() => {

    console.log("cursor library:", window.cursoreffects);

    if (!window.cursoreffects || !window.cursoreffects.rainbowCursor) {
      console.warn("cursor-effects no cargó bien");
      return;
    }

    new window.cursoreffects.rainbowCursor({
      length: 25,
      colors: ["#ba7dff", "#ff4ecd", "#00f0ff", "#ffffff"]
    });

    console.log("cursor iniciado");

  }, 500);
});


let currentLang = "es";

const btn = document.getElementById("langBtn");

function setLanguage(lang) {
  document.querySelectorAll("[data-es]").forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) el.textContent = text;
  });

  btn.textContent = lang === "es" ? "EN" : "ES";
  currentLang = lang;

  localStorage.setItem("lang", lang);
}

btn.addEventListener("click", () => {
  const newLang = currentLang === "es" ? "en" : "es";
  setLanguage(newLang);
});

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("lang");
  if (saved) setLanguage(saved);
});


//CURSOR//

import {
  Renderer,
  Transform,
  Program,
  Mesh,
  Vec2,
  Post,
  Geometry,
  Texture
} from "https://esm.sh/ogl";

const vertex = /* glsl */ `
  precision highp float;

  attribute vec2 uv;
  attribute vec2 position;
  attribute vec2 offset;
  attribute vec3 color;
  attribute float radius;

  uniform vec2 uResolution;

  varying vec2 vUv;
  varying vec3 vColor;

  void main() {
      vUv = uv;
      vColor = color;
      vec2 pos = position * radius;
      vec2 aspect = vec2(uResolution.y / uResolution.x, 1.0);
      pos *= aspect;
      pos += offset;
      gl_Position = vec4(pos, 0., 1.0);
  }
`;

const fragment = /* glsl */ `
precision highp float;

varying vec2 vUv;
varying vec3 vColor;

void main() {
    float dist = distance(vUv, vec2(0.5, 0.5));

    if (dist > 0.5) {
      discard;
    }

    vec3 color = vColor;

    gl_FragColor = vec4(color, 1.0);
}
`;

const compositeFragment = /* glsl */ `
precision mediump float;

uniform sampler2D tMap;
uniform sampler2D tText;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;

varying vec2 vUv;

float boxSDF(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

void main() {
    vec2 uv = vUv;
    vec2 m = uMouse * 0.03;
    vec2 center = vec2(0.5, 0.5) + m;
    vec2 halfSize = vec2(0.3, 0.35);
    float dist = boxSDF(uv - center, halfSize);
    float mask = step(0.0, -dist);

    vec3 n = texture2D(tText, (uv - center + 0.5) * uResolution * 1.5 / 1024.).rgb;
    vec2 displace = n.xy * 2.0 - 1.0;

    uv += displace * 0.1 * mask;

    vec4 c = texture2D(tMap, uv);

    float alphaMask = smoothstep(0.0, 0.01, c.a);

    float gray = dot(n, vec3(0.675, 0.72, 0.41));
    vec3 grayColor = vec3(gray);

    vec3 finalColor = mix(c.rgb, grayColor, mask * (1. - alphaMask));
    
    finalColor = mix(finalColor, 1. - grayColor, mask * alphaMask * 0.015);

    gl_FragColor = vec4(finalColor, c.a);
}
`;

{
  const renderer = new Renderer({
    dpr: devicePixelRatio,
    antialias: true,
    alpha: false
  });
  const gl = renderer.gl;
  const resolution = { value: new Vec2() };
  const time = { value: 0 };
  const bloomResolution = { value: new Vec2() };
  document.querySelector("[data-app-container]").appendChild(gl.canvas);
  gl.clearColor(255, 255, 255, 0);

  const texture = new Texture(gl, {
    wrapT: gl.REPEAT,
    wrapR: gl.REPEAT,
    wrapS: gl.REPEAT
  });
  const img = new Image();
  img.onload = () => (texture.image = img);
  img.crossOrigin = "";
  img.src = "https://i.postimg.cc/zBTc6hnC/Glass-Vintage-001-normal.jpg";

  const scene = new Transform();

  function resize() {
    const { innerWidth: width, innerHeight: height } = window;
    renderer.setSize(width, height);

    resolution.value.set(width, height);
  }
  window.addEventListener("resize", resize, false);

  function generateRainbowColors(numColors) {
    let colors = [];
    for (let i = 0; i < numColors; i++) {
      let h = i / numColors; // hue from 0 to 1
      let s = 0.55; // full saturation
      let v = 0.85; // full brightness
      colors.push(hsvToRgb(h, s, v));
    }
    return colors;
  }

  // HSV to RGB conversion in JS
  function hsvToRgb(h, s, v) {
    let r, g, b;
    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
    }
    return [r, g, b];
  }

  let colors = generateRainbowColors(50);
  const count = colors.length;

  const mouse = new Vec2();
  const smoothMouse = new Vec2();
  const offset = new Float32Array(count * 2).fill(-0.75);
  const radius = new Float32Array(count);
  const color = new Float32Array(count * 3);

  const program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      uResolution: resolution
    }
  });

  colors.forEach((c, i) => {
    color.set(c, i * 3);
    radius[i] = 0.1;
  });

  const geometry = new Geometry(gl, {
    position: {
      size: 2,
      data: new Float32Array([-1, 1, -1, -1, 1, 1, -1, -1, 1, -1, 1, 1])
    },
    uv: {
      size: 2,
      data: new Float32Array([0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1])
    },
    color: { instanced: 1, size: 3, data: color },
    offset: { instanced: 1, size: 2, data: offset },
    radius: { instanced: 1, size: 1, data: radius }
  });

  const mesh = new Mesh(gl, { geometry, program });

  scene.addChild(mesh);

  resize();

  const postComposite = new Post(gl);
  postComposite.addPass({
    fragment: compositeFragment,
    uniforms: {
      uTime: time,
      uMouse: { value: smoothMouse },
      uResolution: resolution,
      tText: { value: texture }
    }
  });

  requestAnimationFrame(update);
  function update(t) {
    requestAnimationFrame(update);

    time.value = t;

    smoothMouse[0] += (mouse.x - smoothMouse[0]) * 0.1;
    smoothMouse[1] += (mouse.y - smoothMouse[1]) * 0.1;

    offset[0] += (mouse.x - offset[0]) * 0.2;
    offset[1] += (mouse.y - offset[1]) * 0.2;

    for (let i = 2; i < count * 2; i += 2) {
      offset[i] += (offset[i - 2] - offset[i]) * 0.5;
      offset[i + 1] += (offset[i - 1] - offset[i + 1]) * 0.5;
    }

    geometry.attributes.offset.needsUpdate = true;

    postComposite.render({ scene });
  }

  function onMouseMove(e) {
    mouse.set(
      (e.clientX / gl.renderer.width) * 2 - 1,
      (e.clientY / gl.renderer.height) * -2 + 1,
      0
    );
  }

  window.addEventListener(
    "pointermove",
    (e) => {
      cancelManualMove();
      onMouseMove(e);
      window.addEventListener("pointermove", onMouseMove);
    },
    {
      once: true
    }
  );

  function onTouch(e) {
    onMouseMove(e.touches[0]);
  }
  window.addEventListener("touchmove", onTouch);
  window.addEventListener("touchstart", (e) => {
    e.preventDefault();

    cancelManualMove();
    onMouseMove(e.touches[0]);
  });

  let mID;
  let tOffset = Math.random() * 1000;
  function manualMouseMove(t) {
    mID = requestAnimationFrame(manualMouseMove);

    t *= 0.001;
    t += tOffset;

    mouse.x = Math.cos(t * 1.5) * Math.cos(t * 0.5);
    mouse.y = Math.sin(t * 1.7) * Math.sin(t * 0.6);
  }
  function cancelManualMove() {
    cancelAnimationFrame(mID);
    mID = 0;
  }
  mID = requestAnimationFrame(manualMouseMove);
}
