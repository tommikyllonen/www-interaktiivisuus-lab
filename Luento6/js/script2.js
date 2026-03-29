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
// MAP is just an array like this:

//  0|1|2
//  3|4|5
//  6|7|8

//west = -1, east = +1, north = -3, south = +3


let mapLocation = 4;


console.log(map[mapLocation]);
const image = document.querySelector("#image");

const output = document.querySelector("#output");
const input = document.querySelector("#input");
const button = document.querySelector('#button')
button.style.cursor = "pointer"
button.addEventListener("click", clickHandler, false)

output.innerHTML = "Sijaintisi on: " + map[mapLocation];

// Pelaajan syöte
let playersInput = "";

// Pelin viesti
let gameMessage = "";

// Pelaajan käytössä olevat toiminnot
const actionsForPlayer = ["pohjoinen", "itä", "etelä", "länsi"]
let action = "";


// functions

function clickHandler(){
  playGame()
}
function playGame(){
  // lue pelaajan syöte
  playersInput = input.value.toLowerCase().trim()

  // Nollaa gameMessage ja action
  gameMessage = ""
  action = ""

  // action = actionsForPlayer.includes(playersInput) ? playersInput : ""
  for (let i = 0; i < actionsForPlayer.length; i++){
    //indexof returns -1 if the value is not found, else it returns the index of the 1st occurence
    if (playersInput.indexOf(actionsForPlayer[i]) !== -1){
      action = actionsForPlayer[i]
      break
    }
  }
  
  // Päivitä kartta pelaajan syötteen perusteella
  switch (action){
    case "pohjoinen":
      if(mapLocation > 2) mapLocation += 3
      else gameMessage = blockMessages[mapLocation]
      break;
    
      case "itä":
      if ((mapLocation + 1) % 3 !== 2)
        mapLocation += 1;
      else
        gameMessage = blockMessages[mapLocation]
      break;

    case "etelä":
      if(mapLocation > 5) mapLocation += 3
      else gameMessage = blockMessages[mapLocation]
      break;
    case "länsi":
      if ((mapLocation + 1) % 3 !== 0)
        mapLocation -= 1;
      else
        gameMessage = blockMessages[mapLocation]
      break;

    default:
      gameMessage = "Tuntematon toiminto"
  }
  render()

  // if(playersInput === "pohjoinen"){
  //   action = "pohjoinen"
  //   if(mapLocation - 3 >= 0){
  //     mapLocation -= 3
  //   } else {
  //     gameMessage = "Et voi mennä pohjoiseen!"
  //   }
  // } else if(playersInput === "itä"){
  //   action = "itä"
  //   if((mapLocation + 1) % 3 !== 0){
  //     mapLocation += 1
  //   } else {
  //     gameMessage = "Et voi mennä itään!"
  //   }
  // } else if(playersInput === "etelä"){
  //   action = "etelä"
  //   if(mapLocation + 3 < map.length){
  //     mapLocation += 3
  //   } else {
  //     gameMessage = "Et voi mennä etelään!"
  //   }
  // } else if(playersInput === "länsi"){
  //   action = "länsi"
  //   if(mapLocation % 3 !== 0){
  //     mapLocation -= 1
  //   } else {
  //     gameMessage = "Et voi mennä länteen!"
  //   }
  // } else {
  //   gameMessage = "Tuntematon komento!"
  // }

  // // Päivitä kartta ja viestit
  // output.innerHTML = "Sijaintisi on: " + map[mapLocation] + "<br>" + gameMessage
}


  function render(){
    output.innerHTML = "<b>Sijaintisi on: </b>" + map[mapLocation] + "<br>" + gameMessage
    image.src = "images/" + images[mapLocation]
  }