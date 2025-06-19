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

// 1) Full Poké list
const pokemonList = [
  { file:'bulbasaur.png',   name:'BULBASAUR'   },
  { file:'ivysaur.png',     name:'IVYSAUR'     },
  { file:'venusaur.png',    name:'VENUSAUR'    },
  { file:'charmander.png',  name:'CHARMANDER'  },
  { file:'charmeleon.png',  name:'CHARMELEON'  },
  { file:'charizard.png',   name:'CHARIZARD'   },
  { file:'squirtle.png',    name:'SQUIRTLE'    },
  { file:'wartortle.png',   name:'WARTORTLE'   },
  { file:'blastoise.png',   name:'BLASTOISE'   },
  { file:'caterpie.png',    name:'CATERPIE'    },
  { file:'metapod.png',     name:'METAPOD'     },
  { file:'butterfree.png',  name:'BUTTERFREE'  },
  { file:'weedle.png',      name:'WEEDLE'      },
  { file:'kakuna.png',      name:'KAKUNA'      },
  { file:'beedrill.png',    name:'BEEDRILL'    },
  { file:'pidgey.png',      name:'PIDGEY'      },
  { file:'pidgeotto.png',   name:'PIDGEOTTO'   },
  { file:'pidgeot.png',     name:'PIDGEOT'     },
  { file:'rattata.png',     name:'RATTATA'     },
  { file:'raticate.png',    name:'RATICATE'    },
  { file:'spearow.png',     name:'SPEAROW'     },
  { file:'fearow.png',      name:'FEAROW'      },
  { file:'ekans.png',       name:'EKANS'       },
  { file:'arbok.png',       name:'ARBOK'       },
  { file:'pikachu.png',     name:'PIKACHU'     },
  { file:'raichu.png',      name:'RAICHU'      },
  { file:'sandshrew.png',   name:'SANDSHREW'   },
  { file:'sandslash.png',   name:'SANDSLASH'   },
  { file:'nidoran_f.png',   name:'NIDORAN♀'    },
  { file:'nidorina.png',    name:'NIDORINA'    },
  { file:'nidoqueen.png',   name:'NIDOQUEEN'   },
  { file:'nidoran_m.png',   name:'NIDORAN♂'    },
  { file:'nidorino.png',    name:'NIDORINO'    },
  { file:'nidoking.png',    name:'NIDOKING'    },
  { file:'clefairy.png',    name:'CLEFAIRY'    },
  { file:'clefable.png',    name:'CLEFABLE'    },
  { file:'vulpix.png',      name:'VULPIX'      },
  { file:'ninetales.png',   name:'NINETALES'   },
  { file:'jigglypuff.png',  name:'JIGGLYPUFF'  },
  { file:'wigglytuff.png',  name:'WIGGLYTUFF'  },
  { file:'zubat.png',       name:'ZUBAT'       },
  { file:'golbat.png',      name:'GOLBAT'      },
  { file:'oddish.png',      name:'ODDISH'      },
  { file:'gloom.png',       name:'GLOOM'       },
  { file:'vileplume.png',   name:'VILEPLUME'   },
  { file:'paras.png',       name:'PARAS'       },
  { file:'parasect.png',    name:'PARASECT'    },
  { file:'venonat.png',     name:'VENONAT'     },
  { file:'venomoth.png',    name:'VENOMOTH'    },
  { file:'diglett.png',     name:'DIGLETT'     },
  { file:'dugtrio.png',     name:'DUGTRIO'     },
  { file:'meowth.png',      name:'MEOWTH'      },
  { file:'persian.png',     name:'PERSIAN'     },
  { file:'psyduck.png',     name:'PSYDUCK'     },
  { file:'golduck.png',     name:'GOLDUCK'     },
  { file:'mankey.png',      name:'MANKEY'      },
  { file:'primeape.png',    name:'PRIMEAPE'    },
  { file:'growlithe.png',   name:'GROWLITHE'   },
  { file:'arcanine.png',    name:'ARCANINE'    },
  { file:'poliwag.png',     name:'POLIWAG'     },
  { file:'poliwhirl.png',   name:'POLIWHIRL'   },
  { file:'poliwrath.png',   name:'POLIWRATH'   },
  { file:'abra.png',        name:'ABRA'        },
  { file:'kadabra.png',     name:'KADABRA'     },
  { file:'alakazam.png',    name:'ALAKAZAM'    },
  { file:'machop.png',      name:'MACHOP'      },
  { file:'machoke.png',     name:'MACHOKE'     },
  { file:'machamp.png',     name:'MACHAMP'     },
  { file:'bellsprout.png',  name:'BELLSPROUT'  },
  { file:'weepinbell.png',  name:'WEEPINBELL'  },
  { file:'victreebel.png',  name:'VICTREEBEL'  },
  { file:'tentacool.png',   name:'TENTACOOL'   },
  { file:'tentacruel.png',  name:'TENTACRUEL'  },
  { file:'geodude.png',     name:'GEODUDE'     },
  { file:'graveler.png',    name:'GRAVELER'    },
  { file:'golem.png',       name:'GOLEM'       },
  { file:'ponyta.png',      name:'PONYTA'      },
  { file:'rapidash.png',    name:'RAPIDASH'    },
  { file:'slowpoke.png',    name:'SLOWPOKE'    },
  { file:'slowbro.png',     name:'SLOWBRO'     },
  { file:'magnemite.png',   name:'MAGNEMITE'   },
  { file:'magneton.png',    name:'MAGNETON'    },
  { file:'farfetchd.png',   name:"FARFETCH'D"  },
  { file:'doduo.png',       name:'DODUO'       },
  { file:'dodrio.png',      name:'DODRIO'      },
  { file:'seel.png',        name:'SEEL'        },
  { file:'dewgong.png',     name:'DEWGONG'     },
  { file:'grimer.png',      name:'GRIMER'      },
  { file:'muk.png',         name:'MUK'         },
  { file:'shellder.png',    name:'SHELLDER'    },
  { file:'cloyster.png',    name:'CLOYSTER'    },
  { file:'gastly.png',      name:'GASTLY'      },
  { file:'haunter.png',     name:'HAUNTER'     },
  { file:'gengar.png',      name:'GENGAR'      },
  { file:'onix.png',        name:'ONIX'        },
  { file:'drowzee.png',     name:'DROWZEE'     },
  { file:'hypno.png',       name:'HYPNO'       },
  { file:'krabby.png',      name:'KRABBY'      },
  { file:'kingler.png',     name:'KINGLER'     },
  { file:'voltorb.png',     name:'VOLTORB'     },
  { file:'electrode.png',   name:'ELECTRODE'   },
  { file:'exeggcute.png',   name:'EXEGGCUTE'   },
  { file:'exeggutor.png',   name:'EXEGGUTOR'   },
  { file:'cubone.png',      name:'CUBONE'      },
  { file:'marowak.png',     name:'MAROWAK'     },
  { file:'hitmonlee.png',   name:'HITMONLEE'   },
  { file:'hitmonchan.png',  name:'HITMONCHAN'  },
  { file:'lickitung.png',   name:'LICKITUNG'   },
  { file:'koffing.png',     name:'KOFFING'     },
  { file:'weezing.png',     name:'WEEZING'     },
  { file:'rhyhorn.png',     name:'RHYHORN'     },
  { file:'rhydon.png',      name:'RHYDON'      },
  { file:'chansey.png',     name:'CHANSEY'     },
  { file:'tangela.png',     name:'TANGELA'     },
  { file:'kangaskhan.png',  name:'KANGASKHAN'  },
  { file:'horsea.png',      name:'HORSEA'      },
  { file:'seadra.png',      name:'SEADRA'      },
  { file:'goldeen.png',     name:'GOLDEEN'     },
  { file:'seaking.png',     name:'SEAKING'     },
  { file:'staryu.png',      name:'STARYU'      },
  { file:'starmie.png',     name:'STARMIE'     },
  { file:'mr_mime.png',     name:'MR. MIME'    },
  { file:'scyther.png',     name:'SCYTHER'     },
  { file:'jynx.png',        name:'JYNX'        },
  { file:'electabuzz.png',  name:'ELECTABUZZ'  },
  { file:'magmar.png',      name:'MAGMAR'      },
  { file:'pinsir.png',      name:'PINSIR'      },
  { file:'tauros.png',      name:'TAUROS'      },
  { file:'magikarp.png',    name:'MAGIKARP'    },
  { file:'gyarados.png',    name:'GYARADOS'    },
  { file:'lapras.png',      name:'LAPRAS'      },
  { file:'ditto.png',       name:'DITTO'       },
  { file:'eevee.png',       name:'EEVEE'       },
  { file:'vaporeon.png',    name:'VAPOREON'    },
  { file:'jolteon.png',     name:'JOLTEON'     },
  { file:'flareon.png',     name:'FLAREON'     },
  { file:'porygon.png',     name:'PORYGON'     },
  { file:'omanyte.png',     name:'OMANYTE'     },
  { file:'omastar.png',     name:'OMASTAR'     },
  { file:'kabuto.png',      name:'KABUTO'      },
  { file:'kabutops.png',    name:'KABUTOPS'    },
  { file:'aerodactyl.png',  name:'AERODACTYL'  },
  { file:'snorlax.png',     name:'SNORLAX'     },
  { file:'articuno.png',    name:'ARTICUNO'    },
  { file:'zapdos.png',      name:'ZAPDOS'      },
  { file:'moltres.png',     name:'MOLTRES'     },
  { file:'dratini.png',     name:'DRATINI'     },
  { file:'dragonair.png',   name:'DRAGONAIR'   },
  { file:'dragonite.png',   name:'DRAGONITE'   },
  { file:'mewtwo.png',      name:'MEWTWO'      },
  { file:'mew.png',         name:'MEW'         }
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
