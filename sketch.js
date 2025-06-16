let bg;
let frontSprite, backSprite;
let frontName, backName;
let hpFront, hpBack;
let gameboyFont;

let lastSwapTime = 0;
const swapInterval = 30 * 60 * 1000; // 30 minutes

// List all Pokémon (lowercase filenames, uppercase names)
const pokemonList = [
  { file: 'bulbasaur.png',   name: 'BULBASAUR'   },
  { file: 'ivysaur.png',     name: 'IVYSAUR'     },
  { file: 'venusaur.png',    name: 'VENUSAUR'    },
  { file: 'charmander.png',  name: 'CHARMANDER'  },
  { file: 'charmeleon.png',  name: 'CHARMELEON'  },
  { file: 'charizard.png',   name: 'CHARIZARD'   },
  { file: 'squirtle.png',    name: 'SQUIRTLE'    },
  { file: 'wartortle.png',   name: 'WARTORTLE'   },
  { file: 'blastoise.png',   name: 'BLASTOISE'   },
  { file: 'caterpie.png',    name: 'CATERPIE'    },
  { file: 'metapod.png',     name: 'METAPOD'     },
  { file: 'butterfree.png',  name: 'BUTTERFREE'  },
  { file: 'weedle.png',      name: 'WEEDLE'      },
  { file: 'kakuna.png',      name: 'KAKUNA'      },
  { file: 'beedrill.png',    name: 'BEEDRILL'    },
  { file: 'pidgey.png',      name: 'PIDGEY'      },
  { file: 'pidgeotto.png',   name: 'PIDGEOTTO'   },
  { file: 'pidgeot.png',     name: 'PIDGEOT'     },
  { file: 'rattata.png',     name: 'RATTATA'     },
  { file: 'raticate.png',    name: 'RATICATE'    },
  { file: 'spearow.png',     name: 'SPEAROW'     },
  { file: 'fearow.png',      name: 'FEAROW'      },
  { file: 'ekans.png',       name: 'EKANS'       },
  { file: 'arbok.png',       name: 'ARBOK'       },
  { file: 'pikachu.png',     name: 'PIKACHU'     },
  { file: 'raichu.png',      name: 'RAICHU'      },
  { file: 'sandshrew.png',   name: 'SANDSHREW'   },
  { file: 'sandslash.png',   name: 'SANDSLASH'   },
  { file: 'nidoran_f.png',   name: 'NIDORAN♀'    },
  { file: 'nidorina.png',    name: 'NIDORINA'    },
  { file: 'nidoqueen.png',   name: 'NIDOQUEEN'   },
  { file: 'nidoran_m.png',   name: 'NIDORAN♂'    },
  { file: 'nidorino.png',    name: 'NIDORINO'    },
  { file: 'nidoking.png',    name: 'NIDOKING'    },
  { file: 'clefairy.png',    name: 'CLEFAIRY'    },
  { file: 'clefable.png',    name: 'CLEFABLE'    },
  { file: 'vulpix.png',      name: 'VULPIX'      },
  { file: 'ninetales.png',   name: 'NINETALES'   },
  { file: 'jigglypuff.png',  name: 'JIGGLYPUFF'  },
  { file: 'wigglytuff.png',  name: 'WIGGLYTUFF'  },
  { file: 'zubat.png',       name: 'ZUBAT'       },
  { file: 'golbat.png',      name: 'GOLBAT'      },
  { file: 'oddish.png',      name: 'ODDISH'      },
  { file: 'gloom.png',       name: 'GLOOM'       },
  { file: 'vileplume.png',   name: 'VILEPLUME'   },
  { file: 'paras.png',       name: 'PARAS'       },
  { file: 'parasect.png',    name: 'PARASECT'    },
  { file: 'venonat.png',     name: 'VENONAT'     },
  { file: 'venomoth.png',    name: 'VENOMOTH'    },
  { file: 'diglett.png',     name: 'DIGLETT'     },
  { file: 'dugtrio.png',     name: 'DUGTRIO'     },
  { file: 'meowth.png',      name: 'MEOWTH'      },
  { file: 'persian.png',     name: 'PERSIAN'     },
  { file: 'psyduck.png',     name: 'PSYDUCK'     },
  { file: 'golduck.png',     name: 'GOLDUCK'     },
  { file: 'mankey.png',      name: 'MANKEY'      },
  { file: 'primeape.png',    name: 'PRIMEAPE'    },
  { file: 'growlithe.png',   name: 'GROWLITHE'   },
  { file: 'arcanine.png',    name: 'ARCANINE'    },
  { file: 'poliwag.png',     name: 'POLIWAG'     },
  { file: 'poliwhirl.png',   name: 'POLIWHIRL'   },
  { file: 'poliwrath.png',   name: 'POLIWRATH'   },
  { file: 'abra.png',        name: 'ABRA'        },
  { file: 'kadabra.png',     name: 'KADABRA'     },
  { file: 'alakazam.png',    name: 'ALAKAZAM'    },
  { file: 'machop.png',      name: 'MACHOP'      },
  { file: 'machoke.png',     name: 'MACHOKE'     },
  { file: 'machamp.png',     name: 'MACHAMP'     },
  { file: 'bellsprout.png',  name: 'BELLSPROUT'  },
  { file: 'weepinbell.png',  name: 'WEEPINBELL'  },
  { file: 'victreebel.png',  name: 'VICTREEBEL'  },
  { file: 'tentacool.png',   name: 'TENTACOOL'   },
  { file: 'tentacruel.png',  name: 'TENTACRUEL'  },
  { file: 'geodude.png',     name: 'GEODUDE'     },
  { file: 'graveler.png',    name: 'GRAVELER'    },
  { file: 'golem.png',       name: 'GOLEM'       },
  { file: 'ponyta.png',      name: 'PONYTA'      },
  { file: 'rapidash.png',    name: 'RAPIDASH'    },
  { file: 'slowpoke.png',    name: 'SLOWPOKE'    },
  { file: 'slowbro.png',     name: 'SLOWBRO'     },
  { file: 'magnemite.png',   name: 'MAGNEMITE'   },
  { file: 'magneton.png',    name: 'MAGNETON'    },
  { file: 'farfetchd.png',   name: "FARFETCH'D"  },
  { file: 'doduo.png',       name: 'DODUO'       },
  { file: 'dodrio.png',      name: 'DODRIO'      },
  { file: 'seel.png',        name: 'SEEL'        },
  { file: 'dewgong.png',     name: 'DEWGONG'     },
  { file: 'grimer.png',      name: 'GRIMER'      },
  { file: 'muk.png',         name: 'MUK'         },
  { file: 'shellder.png',    name: 'SHELLDER'    },
  { file: 'cloyster.png',    name: 'CLOYSTER'    },
  { file: 'gastly.png',      name: 'GASTLY'      },
  { file: 'haunter.png',     name: 'HAUNTER'     },
  { file: 'gengar.png',      name: 'GENGAR'      },
  { file: 'onix.png',        name: 'ONIX'        },
  { file: 'drowzee.png',     name: 'DROWZEE'     },
  { file: 'hypno.png',       name: 'HYPNO'       },
  { file: 'krabby.png',      name: 'KRABBY'      },
  { file: 'kingler.png',     name: 'KINGLER'     },
  { file: 'voltorb.png',     name: 'VOLTORB'     },
  { file: 'electrode.png',   name: 'ELECTRODE'   },
  { file: 'exeggcute.png',   name: 'EXEGGCUTE'   },
  { file: 'exeggutor.png',   name: 'EXEGGUTOR'   },
  { file: 'cubone.png',      name: 'CUBONE'      },
  { file: 'marowak.png',     name: 'MAROWAK'     },
  { file: 'hitmonlee.png',   name: 'HITMONLEE'   },
  { file: 'hitmonchan.png',  name: 'HITMONCHAN'  },
  { file: 'lickitung.png',   name: 'LICKITUNG'   },
  { file: 'koffing.png',     name: 'KOFFING'     },
  { file: 'weezing.png',     name: 'WEEZING'     },
  { file: 'rhyhorn.png',     name: 'RHYHORN'     },
  { file: 'rhydon.png',      name: 'RHYDON'      },
  { file: 'chansey.png',     name: 'CHANSEY'     },
  { file: 'tangela.png',     name: 'TANGELA'     },
  { file: 'kangaskhan.png',  name: 'KANGASKHAN'  },
  { file: 'horsea.png',      name: 'HORSEA'      },
  { file: 'seadra.png',      name: 'SEADRA'      },
  { file: 'goldeen.png',     name: 'GOLDEEN'     },
  { file: 'seaking.png',     name: 'SEAKING'     },
  { file: 'staryu.png',      name: 'STARYU'      },
  { file: 'starmie.png',     name: 'STARMIE'     },
  { file: 'mr_mime.png',     name: 'MR. MIME'    },
  { file: 'scyther.png',     name: 'SCYTHER'     },
  { file: 'jynx.png',        name: 'JYNX'        },
  { file: 'electabuzz.png',  name: 'ELECTABUZZ'  },
  { file: 'magmar.png',      name: 'MAGMAR'      },
  { file: 'pinsir.png',      name: 'PINSIR'      },
  { file: 'tauros.png',      name: 'TAUROS'      },
  { file: 'magikarp.png',    name: 'MAGIKARP'    },
  { file: 'gyarados.png',    name: 'GYARADOS'    },
  { file: 'lapras.png',      name: 'LAPRAS'      },
  { file: 'ditto.png',       name: 'DITTO'       },
  { file: 'eevee.png',       name: 'EEVEE'       },
  { file: 'vaporeon.png',    name: 'VAPOREON'    },
  { file: 'jolteon.png',     name: 'JOLTEON'     },
  { file: 'flareon.png',     name: 'FLAREON'     },
  { file: 'porygon.png',     name: 'PORYGON'     },
  { file: 'omanyte.png',     name: 'OMANYTE'     },
  { file: 'omastar.png',     name: 'OMASTAR'     },
  { file: 'kabuto.png',      name: 'KABUTO'      },
  { file: 'kabutops.png',    name: 'KABUTOPS'    },
  { file: 'aerodactyl.png',  name: 'AERODACTYL'  },
  { file: 'snorlax.png',     name: 'SNORLAX'     },
  { file: 'articuno.png',    name: 'ARTICUNO'    },
  { file: 'zapdos.png',      name: 'ZAPDOS'      },
  { file: 'moltres.png',     name: 'MOLTRES'     },
  { file: 'dratini.png',     name: 'DRATINI'     },
  { file: 'dragonair.png',   name: 'DRAGONAIR'   },
  { file: 'dragonite.png',   name: 'DRAGONITE'   },
  { file: 'mewtwo.png',      name: 'MEWTWO'      },
  { file: 'mew.png',         name: 'MEW'         }
];

function preload() {
  bg = loadImage('bg.png');
  gameboyFont = loadFont('PressStart2P-Regular.ttf');
}

function setup() {
  createCanvas(160, 128);
  textFont(gameboyFont);
  noSmooth();

  // initial random swap
  loadRandomPokemon();
  lastSwapTime = millis();
}

function draw() {
  background(0);
  // auto‐swap every 30m
  if (millis() - lastSwapTime > swapInterval) {
    loadRandomPokemon();
    lastSwapTime = millis();
  }

  // draw BG
  image(bg, 0, 0, 160, 128);

  // draw back (your Pokémon)
  image(backSprite, 11, 32, 50, 50);

  // draw front (enemy)
  image(frontSprite, 104, 10, 40, 40);

  // names
  textSize(6);
  noStroke();
  fill(0);

  // front name (top‐left)
  textAlign(LEFT, TOP);
  { 
    let name = frontName, w = textWidth(name);
    while (w > 60) { name = name.slice(0, -1); w = textWidth(name); }
    text(name, 12, 5);
  }

  // back name (bottom‐right)
  textAlign(LEFT, TOP);
  {
    let name = backName, w = textWidth(name);
    let x = 147 - w;
    text(name, x, 55);
  }

  // HP labels
  textAlign(RIGHT, TOP);
  text("HP", 28, 16);
  text("HP", 88, 65);

  // HP bars
  drawHpBar(30, 16, 50, 5, hpFront);
  drawHpBar(90, 65, 50, 5, hpBack);

  // clock
  textSize(24);
  textAlign(CENTER, CENTER);
  fill(0);
  let hrs = nf(hour(), 2), mins = nf(minute(), 2);
  text(`${hrs}:${mins}`, width/2, 104);
}

// pill-shaped HP bar
function drawHpBar(x,y,w,h,pct) {
  pct = constrain(pct,0,1);
  // fill underneath
  noStroke(); fill(100);
  rect(x,y,pct*w,h,h);
  // outline
  noFill(); stroke(0); strokeWeight(1);
  rect(x,y,w,h,h);
}

// pick two different random Pokémon
function loadRandomPokemon() {
  let i = floor(random(pokemonList.length));
  let j = floor(random(pokemonList.length));
  while (j === i) j = floor(random(pokemonList.length));

  let front = pokemonList[i], back = pokemonList[j];
  frontName = front.name;
  backName = back.name;
  hpFront = random(0.3,1);
  hpBack  = random(0.3,1);

  loadImage(`front/${front.file}`, img=> frontSprite = img);
  loadImage(`back/${back.file}`,   img=> backSprite  = img);
}

// manual swap for testing
function keyPressed() {
  if (key === ' ') {
    loadRandomPokemon();
    lastSwapTime = millis();
  }
}
