let bg, gameboyFont;
let frontSprite, backSprite;
let frontName, backName;
let hpFront, hpBack;

let lastSwapTime = 0;
const swapInterval = 30 * 60 * 1000; // 30 minutes

// … your pokemonList and lookup tables exactly as before …

function preload() {
  bg          = loadImage('bg.png');
  gameboyFont = loadFont('PressStart2P-Regular.ttf');
  // preload front/back images…
}

function setup() {
  pixelDensity(1);            // ensure 1:1 pixel mapping
  // create the “virtual” 160×128 canvas
  createCanvas(160, 128);
  noSmooth();
  textFont(gameboyFont);

  loadRandomPokemon();
  lastSwapTime = millis();
}

function draw() {
  background(0);

  // auto-swap logic…
  if (millis() - lastSwapTime > swapInterval) {
    loadRandomPokemon();
    lastSwapTime = millis();
  }

  // draw everything in 160×128 space:
  image(bg, 0, 0, 160, 128);
  image(backSprite, 11, 32, 50, 50);
  image(frontSprite,104, 10, 40, 40);

  drawNames();
  drawHp();
  drawClock();
}

// … rest of your helpers (drawNames, drawHp, drawClock, drawHpBar, loadRandomPokemon, keyPressed) …
