// sketch.js
let bg, gameboyFont;
let frontSprite, backSprite;
let frontName, backName;
let hpFront, hpBack;

let size_ratio    = 2;
let lastSwapTime  = 0;
const swapInterval = 30 * 60 * 1000; // 30 minutes

// BACK name (right-align here):
const BACK_NAME_END_X = 147;
const BACK_NAME_Y     = 55;

// FRONT name constraints:
const FRONT_NAME_START_X = 12;
const FRONT_NAME_END_X   = 80;
const FRONT_NAME_Y       = 5;

// this will get filled by loadJSON()
let pokemonList = [];

function preload() {
  console.log('▶ preload() start');
  bg          = loadImage('bg.png', () => console.log('✅ bg.png loaded'));
  gameboyFont = loadFont('PressStart2P-Regular.ttf',
                         () => console.log('✅ font loaded'),
                         () => console.warn('⚠ font failed to load'));

  // Try to fetch & parse the full JSON
  pokemonList = loadJSON(
    'pokemonList.json',
    () => {
      console.log(`✅ pokemonList.json loaded, ${pokemonList.length} entries`);
    },
    err => {
      console.warn('❌ httpGet pokemonList.json failed – using fallback 3-entry list:', err);
      pokemonList = [
        { file:'bulbasaur.png', name:'BULBASAUR' },
        { file:'charmander.png', name:'CHARMANDER' },
        { file:'mew.png',        name:'MEW'        }
      ];
    }
  );
}

function setup() {
  pixelDensity(1);
  // GameBoy resolution is 160×144
  createCanvas(160 * size_ratio, 144 * size_ratio);
  noSmooth();
  textFont(gameboyFont);

  // loadJSON sometimes gives an object instead of array
  if (!Array.isArray(pokemonList)) {
    pokemonList = Object.values(pokemonList);
  }

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

  // draw background & sprites at 160×144 coords, scaled up
  image(bg, 0, 0, 160 * size_ratio, 144 * size_ratio);
  if (backSprite)  image(backSprite,  11 * size_ratio, 32 * size_ratio, 50 * size_ratio, 50 * size_ratio);
  if (frontSprite) image(frontSprite,104 * size_ratio, 10 * size_ratio, 40 * size_ratio, 40 * size_ratio);

  drawNames();
  drawHp();
  drawClock();
}

function drawNames() {
  textSize(6 * size_ratio);
  fill(0);
  noStroke();

  // FRONT name: left-aligned, trimmed into box
  textAlign(LEFT, TOP);
  {
    let s    = frontName || '';
    let maxW = (FRONT_NAME_END_X - FRONT_NAME_START_X) * size_ratio;
    while (textWidth(s) > maxW && s.length) {
      s = s.slice(0, -1);
    }
    text(s, FRONT_NAME_START_X * size_ratio, FRONT_NAME_Y * size_ratio);
  }

  // BACK name: right-aligned
  textAlign(RIGHT, TOP);
  text(backName || '', BACK_NAME_END_X * size_ratio, BACK_NAME_Y * size_ratio);
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
  // y = 120 so it stays inside 160×144
  text(`${hrs}:${mins}`, 80 * size_ratio, 120 * size_ratio);
}

function drawHpBar(x, y, w, h, pct) {
  pct = constrain(pct, 0, 1);
  noStroke(); fill(100);
  rect(x, y, pct * w, h, h);
  noFill(); stroke(0); strokeWeight(1);
  rect(x, y, w, h, h);
}

function loadRandomPokemon() {
  if (!pokemonList.length) return;

  // pick two distinct indices
  let i = floor(random(pokemonList.length)),
      j;
  do { j = floor(random(pokemonList.length)); }
  while (j === i);

  let frontP = pokemonList[i],
      backP  = pokemonList[j];

  // stash next values so we only swap when image is loaded
  let nextFrontName = frontP.name,
      nextBackName  = backP.name,
      nextHPFront   = random(0.3, 1),
      nextHPBack    = random(0.3, 1);

  // load front (enemy) sprite, then swap in
  loadImage(`front/${frontP.file}`,
    img => {
      frontSprite = img;
      frontName   = nextFrontName;
      hpFront     = nextHPFront;
    },
    () => console.warn(`⚠ front/${frontP.file} failed to load`)
  );

  // load back (your) sprite, then swap in
  loadImage(`back/${backP.file}`,
    img => {
      backSprite = img;
      backName   = nextBackName;
      hpBack     = nextHPBack;
    },
    () => console.warn(`⚠ back/${backP.file} failed to load`)
  );

  // reset swap‐timer
  lastSwapTime = millis();
}

function keyPressed() {
  if (key === ' ') {
    loadRandomPokemon();
    lastSwapTime = millis();
  }
}
