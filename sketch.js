let bg, gameboyFont;
let frontSprite, backSprite;
let frontName, backName;
let hpFront, hpBack;
let size_ratio = 4;
let lastSwapTime = 0;
const swapInterval = 30 * 60 * 1000; // 30 minutes

// — BACK name right‐aligned here:
const BACK_NAME_END_X = 147;  
const BACK_NAME_Y     = 55;

// — FRONT name constraints: left‐edge and right‐edge:
const FRONT_NAME_START_X = 12;
const FRONT_NAME_END_X   = 80;
const FRONT_NAME_Y       = 5;

// 1) Full Poké list (just first & last shown here for brevity)
const pokemonList = [
  { file:'bulbasaur.png', name:'BULBASAUR' },
  /* … all 151 entries … */
  { file:'mewtwo.png',    name:'MEWTWO'    },
  { file:'mew.png',       name:'MEW'       }
];

// 2) Lookup tables for the preloaded images
let frontImages = {};
let backImages  = {};

function preload() {
  bg          = loadImage('bg.png');
  gameboyFont = loadFont('PressStart2P-Regular.ttf');
  for (let p of pokemonList) {
    frontImages[p.file] = loadImage(`front/${p.file}`);
    backImages [p.file] = loadImage(`back/${p.file}`);
  }
}

function setup() {
  pixelDensity(1);
  createCanvas(160 * size_ratio, 128 * size_ratio);
  noSmooth();
  textFont(gameboyFont);

  loadRandomPokemon();
  lastSwapTime = millis();
}

function draw() {
  background(0);

  // auto‐swap every 30 minutes
  if (millis() - lastSwapTime > swapInterval) {
    loadRandomPokemon();
    lastSwapTime = millis();
  }

  // draw background and sprites in 160×128 coordinates
  image(bg, 0, 0, 160 * size_ratio, 128 * size_ratio);
  image(backSprite,  11 * size_ratio, 32 * size_ratio, 50 * size_ratio, 50 * size_ratio);
  image(frontSprite,104 * size_ratio, 10 * size_ratio, 40 * size_ratio, 40 * size_ratio);

  // draw the UI
  drawNames();
  drawHp();
  drawClock();
}

function drawNames() {
  textSize(6 * size_ratio);
  noStroke();
  fill(0);

  // FRONT name: left-aligned at START_X, trimmed to not exceed END_X
  textAlign(LEFT, TOP);
  {
    let s = frontName;
    // maximum width in actual onscreen pixels:
    const maxW = (FRONT_NAME_END_X - FRONT_NAME_START_X) * size_ratio;
    while (textWidth(s) > maxW && s.length) {
      s = s.slice(0, -1);
    }
    text(
      s,
      FRONT_NAME_START_X * size_ratio,
      FRONT_NAME_Y       * size_ratio
    );
  }

  // BACK name: right-aligned at BACK_NAME_END_X
  textAlign(RIGHT, TOP);
  text(
    backName,
    BACK_NAME_END_X * size_ratio,
    BACK_NAME_Y     * size_ratio
  );
}

function drawHp() {
  textSize(6 * size_ratio);
  fill(0);
  textAlign(RIGHT, TOP);
  text('HP', 28 * size_ratio, 16 * size_ratio);
  text('HP', 88 * size_ratio, 65 * size_ratio);

  drawHpBar(30 * size_ratio, 16 * size_ratio, 50 * size_ratio, 5 * size_ratio, hpFront);
  drawHpBar(90 * size_ratio, 65 * size_ratio, 50 * size_ratio, 5 * size_ratio, hpBack);
}

function drawClock() {
  textSize(24 * size_ratio);
  textAlign(CENTER, CENTER);
  fill(0);
  let hrs  = nf(hour(),   2),
      mins = nf(minute(), 2);
  text(`${hrs}:${mins}`, 80 * size_ratio, 104 * size_ratio);
}

function drawHpBar(x, y, w, h, pct) {
  pct = constrain(pct, 0, 1);
  noStroke();
  fill(100);
  rect(x, y, pct * w, h, h);
  noFill();
  stroke(0);
  strokeWeight(1);
  rect(x, y, w, h, h);
}

function loadRandomPokemon() {
  let i = floor(random(pokemonList.length)),
      j;
  do { j = floor(random(pokemonList.length)); } while (j === i);

  let frontP = pokemonList[i],
      backP  = pokemonList[j];
  frontName   = frontP.name;
  backName    = backP.name;
  hpFront     = random(0.3, 1);
  hpBack      = random(0.3, 1);
  frontSprite = frontImages[frontP.file];
  backSprite  = backImages [backP.file];
}

function keyPressed() {
  if (key === ' ') {
    loadRandomPokemon();
    lastSwapTime = millis();
  }
}
