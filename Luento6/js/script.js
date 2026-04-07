// Luento 6: Pelin luominen
// Mini tavoite harjoitukselle:
// tavoite kukista lohikäärme ruudussa 3:
//pelissä on aluksi vain kivi, hae se joen rannasta (ruutu 6) 
// ja käytä sitä kaivossa (ruutu 1) niin saat huilun, 
// Mene mökille ja käytä huilua niin saat miekan (Ruutu 8)
// Mene lohikäärmeen luo ja käytä miekkaa kukista se! (Ruutu 3)
// tämä saa huilun ilmestymäähn peliin


// Pelikartta

const map = [];

map[0] = "Vanha linnantorni";
map[1] = "Syvä kaivo";
map[2] = "Aurinkoinen metsäaukio";
map[3] = "Nukkuva lohikäärme";
map[4] = "Kapea metsäpolku";
map[5] = "Vanha portti";
map[6] = "Joen ranta";
map[7] = "Tyhjä puupenkki";
map[8] = "Vanha mökki, sisältä kuuluu musiikkia";
// MAP is just an array like this:

//  0|1|2
//  3|4|5
//  6|7|8

//west = -1, east = +1, north = -3, south = +3
const images = [];

images[0] = "torni.jpg";
images[1] = "kaivo.jpg";
images[2] = "aukio.jpg";
images[3] = "dragon.jpg";
images[4] = "polku.jpg";
images[5] = "portti.jpg";
images[6] = "joki.jpg";
images[7] = "penkki.jpg";
images[8] = "mokki.jpg";

const blockMessages = [];

blockMessages[0] = "Haluamasi reitti on liian vaarallinen.";
blockMessages[1] = "Salaperäinen voima estää liikkumisen tuohon suuntaan.";
blockMessages[2] = "Vaikeakulkuinen pusikko estää liikkumisen.";
blockMessages[3] = "Et pääse ohittamaan lohikäärmettä sitä kautta.";
blockMessages[4] = "";
blockMessages[5] = "Portti sulkeutui.";
blockMessages[6] = "Joki on liian syvä ylitettäväksi.";
blockMessages[7] = "Metsä on liian tiheä kuljettavaksi.";
blockMessages[8] = "Olet liian peloissasi mennäksesi tuohon suuntaan.";


let mapLocation = 4;

console.log(map[mapLocation]);

const image = document.querySelector("#image");
const output = document.querySelector("#output");
const input = document.querySelector("#input");
const button = document.querySelector("#button");
button.style.cursor = "pointer";
button.addEventListener("click", clickHandler, false);

output.innerHTML = "Sijaintisi on: " + map[mapLocation];

// Pelaajan syöte
let playersInput = "";
// Pelin viesti
let gameMessage = "";

// Pelissä olevat esineet
let items = ["kivi"];
let itemLocations = [6];
let backPack = [];
let knownItems = ["kivi"];
let item = "";

// Pelaajan käytössä olevat toiminnot
const actionsForPlayer = ["pohjoinen", "itä", "etelä", "länsi", "poimi", "käytä", "jätä"];
let action = "";

//event listeners for arrow keys
window.addEventListener("keydown", (e) => {
    if (e.code == "ArrowUp") playGame(true, "pohjoinen"); 
    else if (e.code == "ArrowDown") playGame(true, "etelä");
    else if (e.code == "ArrowLeft") playGame(true, "länsi");
    else if (e.code == "ArrowRight") playGame(true, "itä");
})

//Handle instructions
const instructionsButton = document.querySelector(".instructions-button");
const closeButton = document.querySelector(".close-button");
const instructions = document.querySelector(".instructions");

instructionsButton.addEventListener("click", () => {
  instructions.style.display = "block";
  instructionsButton.style.display = "none";
});

closeButton.addEventListener("click", () => {
  instructions.style.display = "none";
  instructionsButton.style.display = "block";
});

render();

function clickHandler() {
  console.log("Nappia painettu");
  playGame();
}

function playGame(isKeyboradMovement = false, keyboradDirection = "") {
  
  // Lue pelaajan syöte
  playersInput = isKeyboradMovement ? keyboradDirection :  input.value.toLowerCase().trim();

  // Nollaa gamemessage ja action
  gameMessage = "";
  action = "";
  item = "";
  for (let i = 0; i < actionsForPlayer.length; i++) {
    if (playersInput.indexOf(actionsForPlayer[i]) !== -1) {
      action = actionsForPlayer[i];
      console.log("Pelaajan valinta: " + action);
      break;
    }
  }

  for (let i = 0; i < knownItems.length; i++) {
    if (playersInput.indexOf(knownItems[i]) !== -1) {
      item = knownItems[i];
      console.log("Pelaajan valitsema esine: " + item);
    }
  }

  switch (action) {
    case "pohjoinen":
      if (mapLocation >= 3) {
        mapLocation -= 3;
      } else {
        gameMessage = blockMessages[mapLocation];
      }
      break;

    case "itä":
      if (mapLocation % 3 != 2) {
        mapLocation += 1;
      } else {
        gameMessage = blockMessages[mapLocation];
      }
      break;

    case "etelä":
      if (mapLocation < 6) {
        mapLocation += 3;
      } else {
        gameMessage = blockMessages[mapLocation];
      }
      break;

    case "länsi":
      if (mapLocation % 3 != 0) {
        mapLocation -= 1;
      } else {
        gameMessage = blockMessages[mapLocation];
      }
      break;

    case "poimi":
      takeItem();
      break;

    case "käytä":
      useItem();
      break;

    case "jätä":
      leaveItem();
      break;

    default:
      gameMessage = "Tuntematon toiminto";
  }
  render();
}

function takeItem() {
  let itemIndexNumber = items.indexOf(item);
  if (itemIndexNumber === -1) {
    itemIndexNumber = itemLocations.indexOf(mapLocation);
    if (itemIndexNumber !== -1) {
      item = items[itemIndexNumber];
    }
  }

  if (itemIndexNumber !== -1 && itemLocations[itemIndexNumber] === mapLocation) {
    gameMessage = "Poimit esineen " + item;
    backPack.push(item);
    items.splice(itemIndexNumber, 1);
    itemLocations.splice(itemIndexNumber, 1);
  } else {
    gameMessage = "Et voi tehdä tätä toimintoa";
  }
}

function useItem() {
  const backPackIndexNumber = backPack.indexOf(item);

  if (backPackIndexNumber === -1) {
    gameMessage = "Sinulla ei ole sitä mukana";
  }
  if (backPack.length === 0) {
    gameMessage = "Sinulla ei ole repussa mitään. ";
  }
  if (backPackIndexNumber !== -1) {
  switch (item) {
    case "kivi":
      if (mapLocation === 1) {
        gameMessage = "Pudotat kiven kaivoon. Kaivosta ilmestyy huilu!";
        backPack.splice(backPackIndexNumber, 1);

        if (!items.includes("huilu") && !backPack.includes("huilu")) {
          items.push("huilu");
          itemLocations.push(1);
        }
      } else {
        gameMessage = "Pyörittelet kiveä taskussasi.";
      }
      break;

    case "huilu":
      if (mapLocation === 8) {
        gameMessage = "Soitat huilua. Mökistä löydät miekan!";

        if (!items.includes("miekka") && !backPack.includes("miekka")) {
          items.push("miekka");
          itemLocations.push(8);
        }
      } else {
        gameMessage = "Kaunis musiikki kaikuu ympärilläsi.";
      }
      break;

    case "miekka":
      if (mapLocation === 3) {
        gameMessage = "Heilautat miekkaa ja kukistat lohikäärmeen!";
      } else {
        gameMessage = "Heiluttelet miekkaa tylsistyneenä...";
      }
      break;
  }
 
  }
}



function leaveItem() {
  if (backPack.length != 0) {
    const backPackIndexNumber = backPack.indexOf(item);
    if (backPackIndexNumber !== -1) {
      gameMessage = "Jätit esineen: " + item;
      items.push(backPack[backPackIndexNumber]);
      itemLocations.push(mapLocation);
      backPack.splice(backPackIndexNumber, 1);
    } else {
      gameMessage = "Et voi tehdä tätä.";
    }
  } else {
    gameMessage = "Sinulla ei loe mitään mukana.";
  }
}

function render() {
  //päivitä navigation box
  for (let i = 0; i < map.length; i++){
    if (i === mapLocation) {
      document.querySelector(".nav-box-" + (i + 1) ).style.backgroundColor = "rgb(120, 148, 148)";

    } else {
      document.querySelector(".nav-box-" + (i + 1) ).style.backgroundColor = "transparent";
    }

  }

// }
  // Päivitä kuva
  image.src = "images/" + images[mapLocation];
  // päivitä sijainti näytöllä
  output.innerHTML = "<b>Sijaintisi on: </b>" + map[mapLocation];
  // Pelin viesti
  output.innerHTML += "<br>" + gameMessage;
  // Esineet pelissä
  for (let i = 0; i < items.length; i++) {
    if (mapLocation === itemLocations[i]) {
      // Jos ruudussa on esine, kerro se pelaajalle
      output.innerHTML += "<br> Näet esineen: " + items[i];
    }
  }
  if (backPack.length > 0) {
    output.innerHTML += "<br>Mukanasi on nyt: " + backPack;
  }
  console.log("Pelissä: " + items);
  console.log("Repussa: " + backPack);

}