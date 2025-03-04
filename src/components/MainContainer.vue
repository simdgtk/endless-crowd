<template>
  <div ref="pixiContainer"></div>
  <div class="menu-container">
    <p ref="location" class="menu-container--location">x: 0, y: 0</p>
    <button id="save" class="menu-container--button" @click="savePosition()">Sauvegarder la partie</button>
    <button id="reset" class="menu-container--button" @click="toogleReset()">Revenir au centre</button>
  </div>
  <div class="keyboard-keys" v-if="touch">
    <button class="keyboard-keys--key" ref="left" @touchstart="() => {
      keys[37] = true;
    }" @touchend="() => {
      keys[37] = false;
    }" @touchcancel="() => {
      keys[37] = false;
    }"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" viewBox="0 0 256 256">
        <path
          d="M228,128a12,12,0,0,1-12,12H69l51.52,51.51a12,12,0,0,1-17,17l-72-72a12,12,0,0,1,0-17l72-72a12,12,0,0,1,17,17L69,116H216A12,12,0,0,1,228,128Z">
        </path>
      </svg></button>
    <div class="keyboard-keys--container">
      <button class="keyboard-keys--key" ref="up" @touchstart="() => {
        keys[38] = true;
      }" @touchend="() => {
        keys[38] = false;
      }" @touchcancel="() => {
        keys[38] = false;
      }"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" viewBox="0 0 256 256">
          <path
            d="M208.49,120.49a12,12,0,0,1-17,0L140,69V216a12,12,0,0,1-24,0V69L64.49,120.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0l72,72A12,12,0,0,1,208.49,120.49Z">
          </path>
        </svg></button>
      <button class="keyboard-keys--key" ref="down" @touchstart="() => {
        keys[40] = true;
      }" @touchend="() => {
        keys[40] = false;
      }" @touchcancel="() => {
        keys[40] = false;
      }"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" viewBox="0 0 256 256">
          <path
            d="M208.49,152.49l-72,72a12,12,0,0,1-17,0l-72-72a12,12,0,0,1,17-17L116,187V40a12,12,0,0,1,24,0V187l51.51-51.52a12,12,0,0,1,17,17Z">
          </path>
        </svg></button>
    </div>
    <button class="keyboard-keys--key" ref="right" @touchstart="() => {
      keys[39] = true;
    }" @touchend="() => {
      keys[39] = false;
    }" @touchcancel="() => {
      keys[39] = false;
    }"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" viewBox="0 0 256 256">
        <path
          d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z">
        </path>
      </svg></button>
  </div>
  <div class="modal" ref="modal">
    <span class="modal--name" ref="peopleName">Nom du personnage</span>
    <p class="modal--dialogue" ref="peopleDialogue">"Texte dit par un personnage"</p>
  </div>

</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { Application, Assets, Texture, TilingSprite, Rectangle, AnimatedSprite, Container } from 'pixi.js';
import people from '../people.json';
import sprite from "@/assets/spriteFull.png";
import tile from "@/assets/tile.png";

const pixiContainer = ref(null);
let app; // Stocker l'instance de Pixi
let keys = {}; // Stocker les touches pressées
let keysDivs = {}; // Stocker les divs des touches pressées
const speed = ref(4);
const playerSheet = {}; // Stocker la feuille de sprites
let player; // Stocker le joueur
const reset = ref(false);
const isLoaded = ref(false);
let world; // Stocker le monde, container
const location = ref(null);
const modal = ref(null);
const peopleName = ref(null);
const peopleDialogue = ref(null);
const touch = ref(false);

function savePosition() {
  localStorage.position = JSON.stringify({ x: player.x, y: player.y });
  // localStorage.setItem("position", JSON.stringify({ x: player.x, y: player.y }));
}
function toogleReset() {
  reset.value = !reset.value;
}

onMounted(async () => {
  // Vérifier si l'appareil est tactile
  if ('ontouchstart' in window) {
    touch.value = true;
    modal.value.style.top = "0";
    modal.value.style.height = "fit-content";
  }

  modal.value.style.display = "none";
  console.log(people.characters);
  // Créer une application Pixi uniquement après le montage
  app = new Application();
  await app.init({ backgroundAlpha: 0, width: window.innerWidth, height: window.innerHeight });



  // word container, pour que le personnage se déplace toujours au centre de l'écran
  world = new Container();
  world.height = 5000;
  world.width = 5000;
  app.stage.addChild(world);

  world.x = app.screen.width / 2;
  world.y = app.screen.height / 2;
  world.pivot.x = world.width / 2;
  world.pivot.y = world.height / 2;

  // le fond
  const tileTexture = await Assets.load(tile);
  const tilingSprite = new TilingSprite({
    texture: tileTexture,
    width: app.screen.width * 1,
    height: app.screen.height * 10,
  });
  tilingSprite.tileScale.set(5);
  app.ticker.add(() => {
    tilingSprite.tilePosition.x -= 1;
  });
  // world.addChild(tilingSprite);

  // on window resize, resize le canvas
  window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
  });

  if (pixiContainer.value) {
    pixiContainer.value.appendChild(app.canvas);
  }

  const createPlayerSheet = (sprite) => {
    // Load the base texture
    const baseTexture = Texture.from(sprite).source;

    let w = 64;  // Width of a sprite
    let h = 64;  // Height of a sprite

    // Define the regions for each sprite
    playerSheet["standSouth"] = [
      new Texture({
        source: baseTexture,
        frame: new Rectangle(0 * w, 2 * h, w, h),
      }),
    ];

    playerSheet["standWest"] = [
      new Texture({
        source: baseTexture,
        frame: new Rectangle(0 * w, 1 * h, w, h),
      }),
    ];
    playerSheet["standEast"] = [
      new Texture({
        source: baseTexture,
        frame: new Rectangle(0 * w, 3 * h, w, h),
      }),
    ];
    playerSheet["standNorth"] = [
      new Texture({
        source: baseTexture,
        frame: new Rectangle(0 * w, 0 * h, w, h),
      }),
    ];

    // Walking animations
    playerSheet["walkNorth"] = [
      new Texture({
        source: baseTexture,
        frame: new Rectangle(0 * w, 38 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(1 * w, 38 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(2 * w, 38 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(3 * w, 38 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(4 * w, 38 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(5 * w, 38 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(6 * w, 38 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(7 * w, 38 * h, w, h),
      }),

    ];
    playerSheet["walkWest"] = [
      new Texture({
        source: baseTexture,
        frame: new Rectangle(0 * w, 39 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(1 * w, 39 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(2 * w, 39 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(3 * w, 39 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(4 * w, 39 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(5 * w, 39 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(6 * w, 39 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(7 * w, 39 * h, w, h),
      }),
    ];
    playerSheet["walkSouth"] = [
      new Texture({
        source: baseTexture,
        frame: new Rectangle(0 * w, 40 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(1 * w, 40 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(2 * w, 40 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(3 * w, 40 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(4 * w, 40 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(5 * w, 40 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(6 * w, 40 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(7 * w, 40 * h, w, h),
      }),
    ];
    playerSheet["walkEast"] = [
      new Texture({
        source: baseTexture,
        frame: new Rectangle(0 * w, 41 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(1 * w, 41 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(2 * w, 41 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(3 * w, 41 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(4 * w, 41 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(5 * w, 41 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(6 * w, 41 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(7 * w, 41 * h, w, h),
      }),
    ];
    playerSheet["idle"] = [
      new Texture({
        source: baseTexture,
        frame: new Rectangle(0 * w, 24 * h, w, h),
      }),
      new Texture({
        source: baseTexture,
        frame: new Rectangle(1 * w, 24 * h, w, h),
      })
    ];
    playerSheet["idle1"] = [
      new Texture({
        source: baseTexture,
        frame: new Rectangle(0 * w, 24 * h, w, h),
      }),
    ]
    playerSheet["idle2"] = [
      new Texture({
        source: baseTexture,
        frame: new Rectangle(1 * w, 24 * h, w, h),
      }),
    ]
  };

  const createPlayer = () => {
    player = new AnimatedSprite(playerSheet["walkSouth"]);
    player.anchor.set(0.5);
    player.animationSpeed = .5;
    player.loop = false;
    // placer au centre de l'écran, utiliser canvas au lieu de view (déprécié)
    // player.x = app.screen.width / 2;
    player.x = world.width / 2 - 32;
    player.y = world.height / 2 - 32;
    player.zIndex = 10;
    // app.stage.addChild(player);
    world.addChild(player);
    player.play();

    // Sauvegarde de la partie avec local storage
    // localStorage (currently) only supports strings as values, and in order to do that the objects need to be stringified (stored as JSON-string) before they can be stored
    if (localStorage.position) {
      const position = JSON.parse(localStorage.position);
      console.log("Position sauvegardée :", position);
      player.x = position.x;
      player.y = position.y;
      world.pivot.x = player.x;
      world.pivot.y = player.y;
      location.value.textContent = `x: ${player.x}, y: ${player.y}`;

      // Savoir combien d'espace est utilisé dans le local storage
      var localStorageSpace = function () {
        var allStrings = '';
        for (var key in window.localStorage) {
          if (window.localStorage.hasOwnProperty(key)) {
            allStrings += window.localStorage[key];
          }
        }
        return allStrings ? 3 + ((allStrings.length * 16) / (8 * 1024)) + ' KB' + ` donc ${(((allStrings.length * 16) / (8 * 1024)) / 5120 * 100).toFixed(2)}% environ` : 'Empty (0 KB)';
      };
      console.log('localStorage space: ' + localStorageSpace());
    }
  }

  const createPeople = () => {
    console.log("people", people.characters);
    people.characters.forEach(character => {
      const characterSprite = new AnimatedSprite(playerSheet["standSouth"]);
      characterSprite.anchor.set(0.5);
      characterSprite.animationSpeed = .5;
      characterSprite.loop = true;
      characterSprite.x = character.position.x;
      characterSprite.y = character.position.y;
      characterSprite.zIndex = -10;
      characterSprite.play();
      character.seen = false;
      app.ticker.add(() => {

        if (intersects(player, characterSprite)) {
          modal.value.style.display = "block";
          // console.log(character.dialogue);
          character.seen = true;
          peopleName.value.textContent = character.name;
          peopleDialogue.value.textContent = character.dialogue;
          // console.log(character.seen);
          setTimeout(() => {
            modal.value.style.display = "none";
          }, 4000);
        }

      });
      world.addChild(characterSprite);
    });
  }


  const progress = ref(0);
  Assets.load(sprite).then(() => {
    progress.value = 100; // S'assurer que la barre va à 100%
    console.log("Assets chargés");

    // créer la feuille de sprites
    createPlayerSheet(sprite);
    // puis créer le personnage
    createPlayer();
    createPeople();
    isLoaded.value = true;

  }).catch(error => {
    console.error("Erreur de chargement :", error);
  });


  // Gestion des événements souris
  app.stage.interactive = true;
  app.stage.hitArea = app.screen; // Permet de capter les events partout dans la scène, par défaut, seuls les éléments interactifs sont captés

  // Gestion des événements clavier
  const keysDown = (e) => {
    keys[e.keyCode] = true;
  }
  const keysUp = (e) => {
    keys[e.keyCode] = false;
  }

  window.addEventListener("keydown", keysDown)
  window.addEventListener("keyup", keysUp)

  // ticker
  const gameLoop = (delta) => {
    // let distance = delta * speed.value *;
    if (isLoaded.value) {
      // console.log("player.x", player.x, "player.y", player.y);
      // Vérifie si une touche de déplacement est enfoncée
      const isMoving = keys["90"] || keys["81"] || keys["68"] || keys["83"] || keys["37"] || keys["38"] || keys["39"] || keys["40"];
      if (!isMoving) {
        if (player.textures !== playerSheet["idle1"]) {
          player.textures = playerSheet["idle1"];
          player.play();
        }
      } else {
        location.value.textContent = `x: ${player.x}, y: ${player.y}`;
      }

      // Déplacements
      if (keys["90"]) {
        // faire l'animation qu'une fois
        if (!player.playing) {
          player.textures = playerSheet["walkNorth"];
          player.play();
        }
        player.y -= speed.value;
        world.pivot.y = player.y;
      }
      if (keys["81"]) {
        if (!player.playing) {
          player.textures = playerSheet["walkWest"];
          player.play();
        }
        player.x -= speed.value;
        world.pivot.x = player.x;

      }
      if (keys["68"]) {
        if (!player.playing) {
          player.textures = playerSheet["walkEast"];
          player.play();
        }
        player.x += speed.value;
        world.pivot.x = player.x;

      }
      if (keys["83"]) {
        if (!player.playing) {
          player.textures = playerSheet["walkSouth"];
          player.play();
        }
        player.y += speed.value;
        world.pivot.y = player.y;

      }
      // touches fléchées
      if (keys["37"]) {
        if (!player.playing) {
          player.textures = playerSheet["walkWest"];
          player.play();
        }
        player.x -= speed.value;
        world.pivot.x = player.x;

      }
      if (keys["38"]) {
        if (!player.playing) {
          player.textures = playerSheet["walkNorth"];
          player.play();
        }
        player.y -= speed.value;
        world.pivot.y = player.y;
      }
      if (keys["39"]) {
        if (!player.playing) {
          player.textures = playerSheet["walkEast"];
          player.play();
        }
        player.x += speed.value;
        world.pivot.x = player.x;

      }
      if (keys["40"]) {
        if (!player.playing) {
          player.textures = playerSheet["walkSouth"];
          player.play();
        }
        player.y += speed.value;
        world.pivot.y = player.y;

      }

      // Réinitialisation à la position centrale
      if (reset.value) {
        player.x = 0;
        player.y = 0;
        world.pivot.x = player.x;
        world.pivot.y = player.y;
        location.value.textContent = `x: ${player.x}, y: ${player.y}`;
        reset.value = false;
      }
    }
  }

  app.ticker.add(gameLoop);

  // collision
  const intersects = (a, b) => {
    let aBox = a.getBounds();
    let bBox = b.getBounds();

    return aBox.x + aBox.width > bBox.x &&
      aBox.x < bBox.x + bBox.width &&
      aBox.y + aBox.height > bBox.y &&
      aBox.y < bBox.y + bBox.height;
  }


});

// Nettoyage lorsque le composant est démonté
onBeforeUnmount(() => {
  if (app) {
    app.destroy(true);
  }
});
</script>

<style scoped lang="scss">
.menu-container {
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  background: none;
  border-radius: 5px;
  color: white;
  z-index: 9999;

  &--button {
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color .3s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.7);
    }

    &:active {
      background-color: rgba(0, 0, 0, 0.9);
    }
  }

  &--location {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 5px;
    color: white;
    font-variant-numeric: tabular-nums;
  }
}

.modal {
  position: fixed;
  bottom: 0;
  left: 0;
  // width: fit-content;
  width: 100%;
  background-color: rgba(0, 0, 0, 1);
  padding: 30px;
  color: white;
  // max-width: 320px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  // border-radius: 4px;

  // &::after {
  //   content: "";
  //   position: absolute;
  //   bottom: 100%;
  //   left: 50%;
  //   transform: translate(-50%, 0);
  //   border-width: 10px;
  //   border-style: solid;
  //   border-color: transparent transparent rgba(0, 0, 0, 1) transparent;
  // }

  &--name {
    font-size: 1rem;
    font-weight: bold;
  }

  &--dialogue {
    font-size: 0.8rem;
  }
}

.keyboard-keys {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: center;
  margin-bottom: 2rem;

  &--container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &--key {
    display: flex;
    align-items: baseline;
    align-items: anchor-center;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 16px 20px;
    border-radius: 5px;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    transition: background-color .3s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.7);
    }

    &:active {
      background-color: rgba(0, 0, 0, 0.9);
    }
  }
}
</style>
