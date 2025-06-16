let bg, gameboyFont;
let frontSprite, backSprite;
let frontName, backName;
let hpFront, hpBack;

let lastSwapTime = 0;
const swapInterval = 30 * 60 * 1000; // 30 minutes

// 1) Your full Poké list
const pokemonList = [
  { file:'bulbasaur.png', name:'BULBASAUR' },  
  /* … all 151 entries … */
  { file:'mewtwo.png',    name:'MEWTWO'    },
  { file:'mew.png',       name:'MEW'       }
];

// 2) Lookup tables for preloaded images
let frontImages = {};
let backImages  = {};

function preload() {
  // load background + font
  bg          = loadImage('bg.png');
  gameboyFont = loadFont('PressStart2P-Regular.ttf');
  // preload every front/back sprite
  for (let p of pokemonList) {
    frontImages[p.file] = loadImage(`front/${p.file}`);
    backImages [p.file] = loadImage(`back/${p.file}`);
  }
}

function setup() {
  pixelDensity(1);              // avoid high-DPI scaling
  createCanvas(160 * 3, 128 * 3);
  noSmooth();
  textFont(gameboyFont);
  loadRandomPokemon();
  lastSwapTime = millis();
}

function draw() {
  background(0);

  // auto-swap every 30m
  if (millis() - lastSwapTime > swapInterval) {
    loadRandomPokemon();
    lastSwapTime = millis();
  }

  // scale everything 3× inside this block
  push();
  scale(3);

    // draw background (virtual 160×128 coords)
    image(bg, 0, 0, 160, 128);

    // draw your back sprite & front sprite
    image(backSprite,  11, 32, 50, 50);
    image(frontSprite,104, 10, 40, 40);

    // draw the UI
    drawNames();
    drawHp();
    drawClock();

  pop();
}

// --- helper: draw the two names ---
function drawNames() {
  textSize(6);
  noStroke();
  fill(0);
  // FRONT name (trim to max width 60px)
  textAlign(LEFT, TOP);
  {
    let nm = frontName;
    while (textWidth(nm) > 60) {
      nm = nm.slice(0, -1);
    }
    text(nm, 12, 5);
  }
  // BACK name (right-justified at x=147)
  textAlign(LEFT, TOP);
  {
    let w = textWidth(backName);
    text(backName, 147 - w, 55);
  }
}

// --- helper: draw HP labels & bars ---
function drawHp() {
  textSize(6);
  fill(0);
  textAlign(RIGHT, TOP);
  text('HP', 28, 16);
  text('HP', 88, 65);
  // pill bars
  drawHpBar(30, 16, 50, 5, hpFront);
  drawHpBar(90, 65, 50, 5, hpBack);
}

// --- helper: draw the clock ---
function drawClock() {
  textSize(24);
  textAlign(CENTER, CENTER);
  fill(0);
  let hrs  = nf(hour(),   2),
      mins = nf(minute(), 2);
  text(`${hrs}:${mins}`, 80, 104);
}

// pill-shaped HP bar
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

// pick two distinct random Pokémon and grab from preloaded tables
function loadRandomPokemon() {
  let i = floor(random(pokemonList.length)),
      j;
  do { j = floor(random(pokemonList.length)); } while (j === i);

  frontName   = pokemonList[i].name;
  backName    = pokemonList[j].name;
  hpFront     = random(0.3, 1);
  hpBack      = random(0.3, 1);
  frontSprite = frontImages[pokemonList[i].file];
  backSprite  = backImages [pokemonList[j].file];
}

// manual test swap on spacebar
function keyPressed() {
  if (key === ' ') {
    loadRandomPokemon();
    lastSwapTime = millis();
  }
}
