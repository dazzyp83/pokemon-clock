let bg, gameboyFont;
let frontSprite, backSprite;
let frontName, backName;
let hpFront, hpBack;

let lastSwapTime = 0;
const swapInterval = 30 * 60 * 1000; // 30 minutes

// 1) Define your full Poké list (filename ↔ name)
const pokemonList = [
  { file:'bulbasaur.png',   name:'BULBASAUR'   },
  { file:'ivysaur.png',     name:'IVYSAUR'     },
  { file:'venusaur.png',    name:'VENUSAUR'    },
  /* … all 151 entries here … */
  { file:'mewtwo.png',      name:'MEWTWO'      },
  { file:'mew.png',         name:'MEW'         }
];

// 2) Lookup tables to hold preloaded images
let frontImages = {};
let backImages  = {};

function preload() {
  // load bg & font
  bg          = loadImage('bg.png');
  gameboyFont = loadFont('PressStart2P-Regular.ttf');

  // preload every front & back sprite
  for (let p of pokemonList) {
    frontImages[p.file] = loadImage(`front/${p.file}`);
    backImages [p.file] = loadImage(`back/${p.file}`);
  }
}

function setup() {
  createCanvas(160, 128);
  noSmooth();
  textFont(gameboyFont);

  loadRandomPokemon();
  lastSwapTime = millis();
}

function draw() {
  background(0);

  // auto‐swap every 30 m
  if (millis() - lastSwapTime > swapInterval) {
    loadRandomPokemon();
    lastSwapTime = millis();
  }

  // draw BG
  image(bg, 0, 0, 160, 128);

  // draw Pokémon
  image(backSprite, 11,  32, 50, 50);
  image(frontSprite,104,  10, 40, 40);

  // NAMES
  textSize(6);
  noStroke();
  fill(0);

  // Front name (trim if too wide)
  textAlign(LEFT, TOP);
  {
    let nm = frontName;
    while (textWidth(nm) > 60) nm = nm.slice(0, -1);
    text(nm, 12, 5);
  }

  // Back name (right‐justify)
  textAlign(LEFT, TOP);
  {
    let w = textWidth(backName);
    text(backName, 147 - w, 55);
  }

  // HP Labels
  textAlign(RIGHT, TOP);
  text('HP', 28, 16);
  text('HP', 88, 65);

  // HP Bars
  drawHpBar(30, 16, 50, 5, hpFront);
  drawHpBar(90, 65, 50, 5, hpBack);

  // Clock
  textSize(24);
  textAlign(CENTER, CENTER);
  let hrs  = nf(hour(), 2),
      mins = nf(minute(), 2);
  text(`${hrs}:${mins}`, width/2, 104);
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
  // pick two different indices
  let i = floor(random(pokemonList.length));
  let j;
  do { j = floor(random(pokemonList.length)); } while (j === i);

  let frontP = pokemonList[i],
      backP  = pokemonList[j];

  frontName   = frontP.name;
  backName    = backP.name;
  hpFront     = random(0.3, 1);
  hpBack      = random(0.3, 1);
  frontSprite = frontImages[ frontP.file ];
  backSprite  = backImages[  backP.file  ];
}

// manual swap for testing
function keyPressed() {
  if (key === ' ') {
    loadRandomPokemon();
    lastSwapTime = millis();
  }
}
