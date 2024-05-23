const background = document.getElementById("background");

const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext('2d');

const audioPrompt = document.getElementById("audio-prompt");

const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");

const arrow = document.getElementById("arrow");
const chevron = document.querySelector(".chevron");

const rules = document.getElementById("rules");
const postman = document.querySelector(".postman");

let intro = new Audio("audio/music-intro.wav");
let music = new Audio("audio/music.wav");
let yah = new Audio("audio/yah.wav");
let done = new Audio("audio/done.wav");
let next = new Audio("audio/next.wav");

let isMuted = false;

const symbols = [
  "symbols/clock.png",
  "symbols/deku.png",
  "symbols/fierce.png",
  "symbols/goron.png",
  "symbols/majora.png",
  "symbols/mirror.png",
  "symbols/moon.png",
  "symbols/ocarina.png",
  "symbols/zora.png",
];

window.addEventListener("load", (event) => {
  backgroundSymbols();
});

function backgroundSymbols() {
  const currentImages = background.getElementsByClassName("symbol");
  if (currentImages.length >= 5) {
    background.removeChild(currentImages[0]);
  }

  const img = document.createElement("img");
  img.src = symbols[Math.floor(Math.random() * symbols.length)];
  img.style.left = Math.random() * 85 + "%";
  img.style.top = Math.random() * 85 + "%";
  img.style.filter = "blur(0.9px)"
  img.className = "symbol";
  img.alt = "";
  background.appendChild(img);

  // Fade-in effect
  setTimeout(() => {
    img.style.opacity = 0.8;
  }, 10);

  // Fade-out effect and removal
  setTimeout(() => {
    img.style.opacity = 0;
    setTimeout(() => {
      if (img.parentElement) {
        img.parentElement.removeChild(img);
      }
    }, 1000);
  }, 4000);
}

setInterval(backgroundSymbols, 1000);

let dialogBoxWidth = 750;
let dialogBoxHeight = 200;

ctx.strokeStyle = "rgba(0 0 0 / 0.8)";
ctx.fillStyle = "rgba(0 0 0 / 0.8)";
ctx.beginPath();

// roundRect(x, y, width, height, radii)
ctx.roundRect(25, canvas.height - dialogBoxHeight - 10, dialogBoxWidth, dialogBoxHeight, [10]);
ctx.stroke();
ctx.fill();
