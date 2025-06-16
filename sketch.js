let bg, gameboyFont;
let frontSprite, backSprite;
let frontName, backName;
let hpFront, hpBack;

let lastSwapTime = 0;
const swapInterval = 30 * 60 * 1000; // 30 minutes

const pokemonList = [ 
  { file:'bulbasaur.png', name:'BULBASAUR' },
  /* … all 151 entries … */
  { file:'mewtwo.png',     name:'MEWTWO'    },
  { file:'mew.png',        name:'MEW'       }
];

// lookup tables
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
  // 3× the ST7735 resolution
  pixelDensity(1);
  createCanvas(160 * 3, 128 * 3);
  noSmooth();
  textFont(gameboyFont);

  loadRandomPokemon();
  lastSwapTime = millis();
}

function draw() {
  background(0);

  // scale everything by 3×
  scale(3);

  // auto-swap
  if (millis() - lastSwapTime > swapInterval) {
    loadRandomPokemon();
    lastSwapTime = millis();
  }

  // draw BG
  image(bg, 0, 0, 160, 128);

  // draw sprites
  image(backSprite,  11, 32, 50, 50);
  image(frontSprite,104, 10, 40, 40);

  // names
  textSize(6);
  noStroke();
  fill(0);

  // front name (trimmed)
  textAlign(LEFT, TOP);
  {
    let nm = frontName;
    while (textWidth(nm) > 60) nm = nm.slice(0, -1);
    text(nm, 12, 5);
  }

  // back name (right-justify)
  textAlign(LEFT, TOP);
  {
    let w = textWidth(backName);
    text(backName, 147 - w, 55);
  }

  // HP labels
  textAlign(RIGHT, TOP);
  text('HP', 28, 16);
  text('HP', 88, 65);

  // HP bars
  drawHpBar(30, 16, 50, 5, hpFront);
  drawHpBar(90, 65, 50, 5, hpBack);

  // clock
  textSize(24);
  textAlign(CENTER, CENTER);
  let hrs  = nf(hour(),   2),
      mins = nf(minute(), 2);
  text(`${hrs}:${mins}`, 80, 104);
}

function drawHpBar(x,y,w,h,pct) {
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

  frontName   = pokemonList[i].name;
  backName    = pokemonList[j].name;
  hpFront     = random(0.3, 1);
  hpBack      = random(0.3, 1);
  frontSprite = frontImages[pokemonList[i].file];
  backSprite  = backImages [pokemonList[j].file];
}

function keyPressed() {
  if (key === ' ') {
    loadRandomPokemon();
    lastSwapTime = millis();
  }
}
