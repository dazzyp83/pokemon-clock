let bg, gameboyFont;
let frontSprite, backSprite;
let frontName, backName;
let hpFront, hpBack;

let lastSwapTime = 0;
const swapInterval = 30 * 60 * 1000; // 30 minutes

// 1) Full Poké list (filename ↔ display name)
const pokemonList = [
  { file:'bulbasaur.png', name:'BULBASAUR' },
  { file:'ivysaur.png',   name:'IVYSAUR'   },
  { file:'venusaur.png',  name:'VENUSAUR'  },
  { file:'charmander.png',name:'CHARMANDER'},
  /* … include all 151 entries here … */
  { file:'mewtwo.png',    name:'MEWTWO'    },
  { file:'mew.png',       name:'MEW'       }
];

// 2) Lookup tables to store preloaded images
let frontImages = {};
let backImages  = {};

function preload() {
  // background + font
  bg          = loadImage('bg.png');
  gameboyFont = loadFont('PressStart2P-Regular.ttf');

  // preload every front/back sprite into our tables
  for (let p of pokemonList) {
    frontImages[p.file] = loadImage(`front/${p.file}`);
    backImages [p.file] = loadImage(`back/${p.file}`);
  }
}

function setup() {
  pixelDensity(1);       // 1:1 pixel mapping
  createCanvas(160, 128); // “virtual” resolution
  noSmooth();
  textFont(gameboyFont);

  loadRandomPokemon();
  lastSwapTime = millis();
}

function draw() {
  background(0);

  // auto-swap every 30 minutes
  if (millis() - lastSwapTime > swapInterval) {
    loadRandomPokemon();
    lastSwapTime = millis();
  }

  // draw BG and sprites in 160×128 space
  image(bg, 0, 0, 160, 128);
  image(backSprite,  11, 32, 50, 50);
  image(frontSprite,104, 10, 40, 40);

  // draw UI
  drawNames();
  drawHp();
  drawClock();
}

// -- draw the two names, trimming or right-justifying as needed
function drawNames() {
  textSize(6);
  noStroke();
  fill(0);

  // FRONT name (trim if >60px)
  textAlign(LEFT, TOP);
  {
    let nm = frontName;
    while (textWidth(nm) > 60) { nm = nm.slice(0, -1); }
    text(nm, 12, 5);
  }

  // BACK name (right-justified at x=147)
  textAlign(LEFT, TOP);
  {
    let w = textWidth(backName);
    text(backName, 147 - w, 55);
  }
}

// -- HP text + pill bars
function drawHp() {
  textSize(6);
  fill(0);
  textAlign(RIGHT, TOP);
  text('HP', 28, 16);
  text('HP', 88, 65);

  drawHpBar(30, 16, 50, 5, hpFront);
  drawHpBar(90, 65, 50, 5, hpBack);
}

// -- large pixel font clock
function drawClock() {
  textSize(24);
  textAlign(CENTER, CENTER);
  fill(0);
  let hrs  = nf(hour(),   2),
      mins = nf(minute(), 2);
  text(`${hrs}:${mins}`, 80, 104);
}

// -- draw a rounded “pill” HP bar
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

// -- pick two distinct random Pokémon and grab their sprites
function loadRandomPokemon() {
  let i = floor(random(pokemonList.length)),
      j;
  do { j = floor(random(pokemonList.length)); }
  while (j === i);

  frontName   = pokemonList[i].name;
  backName    = pokemonList[j].name;
  hpFront     = random(0.3, 1);
  hpBack      = random(0.3, 1);
  frontSprite = frontImages[pokemonList[i].file];
  backSprite  = backImages [pokemonList[j].file];
}

// -- manual swap for testing
function keyPressed() {
  if (key === ' ') {
    loadRandomPokemon();
    lastSwapTime = millis();
  }
}
