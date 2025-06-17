let bg, gameboyFont;
let frontSprite, backSprite;
let frontName, backName;
let hpFront, hpBack;

let lastSwapTime = 0;
const swapInterval = 30 * 60 * 1000; // 30 minutes

// … your full 151‐entry pokemonList as before …

// lookup tables
let frontImages = {}, backImages = {};

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
  // make the actual displayed canvas 3× larger:
  createCanvas(160 * 3, 128 * 3);
  noSmooth();
  textFont(gameboyFont);

  loadRandomPokemon();
  lastSwapTime = millis();
}

function draw() {
  background(0);

  // auto‐swap
  if (millis() - lastSwapTime > swapInterval) {
    loadRandomPokemon();
    lastSwapTime = millis();
  }

  // now everything in here is scaled up 3×
  push();
  scale(3);

    // draw as if 160×128
    image(bg,   0,    0, 160, 128);
    image(backSprite,  11, 32, 50, 50);
    image(frontSprite,104, 10, 40, 40);
    drawNames();
    drawHp();
    drawClock();

  pop();
}

function drawNames() {
  textSize(6);
  noStroke();
  fill(0);
  // FRONT name
  textAlign(LEFT, TOP);
  let nm = frontName;
  while (textWidth(nm) > 60) nm = nm.slice(0, -1);
  text(nm, 12, 5);

  // BACK name
  textAlign(LEFT, TOP);
  let w = textWidth(backName);
  text(backName, 147 - w, 55);
}

function drawHp() {
  textSize(6);
  fill(0);
  textAlign(RIGHT, TOP);
  text('HP', 28, 16);
  text('HP', 88, 65);
  drawHpBar(30, 16, 50, 5, hpFront);
  drawHpBar(90, 65, 50, 5, hpBack);
}

function drawClock() {
  textSize(24);
  textAlign(CENTER, CENTER);
  fill(0);
  let hrs = nf(hour(),  2),
      mins= nf(minute(),2);
  text(`${hrs}:${mins}`, 80, 104);
}

function drawHpBar(x,y,w,h,pct) {
  pct = constrain(pct,0,1);
  noStroke(); fill(100);
  rect(x, y, pct*w, h, h);
  noFill(); stroke(0); strokeWeight(1);
  rect(x, y, w, h, h);
}

function loadRandomPokemon() {
  let i = floor(random(pokemonList.length)),
      j;
  do { j = floor(random(pokemonList.length)); } while (j===i);

  let f = pokemonList[i], b = pokemonList[j];
  frontName   = f.name;
  backName    = b.name;
  hpFront     = random(0.3,1);
  hpBack      = random(0.3,1);
  frontSprite = frontImages[f.file];
  backSprite  = backImages [b.file];
}

function keyPressed() {
  if (key === ' ') {
    loadRandomPokemon();
    lastSwapTime = millis();
  }
}
