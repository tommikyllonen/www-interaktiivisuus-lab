const mysteryNumber = Math.floor(Math.random() * 100) + 1;
console.log("Mystery number:", mysteryNumber);
let playersGuess = 0;
let guessesMade = 0;
let gameState = "";
let guessesRemaining = 10;
let gameWon = false;

const input = document.querySelector("#number_input");
const button = document.querySelector("#button");
const output = document.querySelector("#output");
const resetButton = document.querySelector("#reset-button");

button.style.cursor = "pointer";
resetButton.style.cursor = "pointer";


// reset button
resetButton.addEventListener("click", () => {
    resetGame();
}
)

button.addEventListener("click", () => {
    clickHandler();
})

window.addEventListener("keydown", keydownHandler, false);

const clickHandler = () => {
    validateInput();
}
function keydownHandler(e) {
    //This prins out the keycode value e.g. 13 for Enter key
    // console.log(e.keyCode);

    if (e.keyCode === 13) {
        // e.preventDefault();
       validateInput();
    }
}

// listen for Enter and tab on the input field
// input.addEventListener("keydown", (e) => {
//     if (e.key === "Enter" || e.key === "Tab") {
//         e.preventDefault();
//         clickHandler();
//     }
// })


function validateInput() {

    output.style.color = "black";
    playersGuess = parseInt(input.value);
    if(input.value == ""){
        output.style.color = "red";
        output.innerHTML = "Syötäthän numeron väliltä 1-100.";
    }
    else if (isNaN(playersGuess) ){
        output.style.color = "red";
        output.innerHTML = "Syötäthän vain numeroita.";
        input.value = ""
    }
    else if (playersGuess < 1 || playersGuess > 100){
        output.style.color = "red";
        output.innerHTML = `Numero ${playersGuess} ei ole sallittu. Syötäthän numeron väliltä 1-100.`;
        input.value = ""
    }
    else{
        playGame();
        
    }
}

function playGame() {
    guessesRemaining--;
    guessesMade++;
    gameState = `Arvaus nro: ${guessesMade}, arvauksia jäljellä: ${guessesRemaining}`;

    if (playersGuess < mysteryNumber) {
        output.innerHTML = "Arvaus oli liian pieni. " + gameState;
        if(guessesRemaining < 1){
            endGame();
        }
    } else if (playersGuess > mysteryNumber) {
        output.innerHTML = "Arvaus oli liian suuri. " + gameState;
        if(guessesRemaining < 1){
            endGame();
        }
    } else {
        output.innerHTML = "Arvasit oikein. " + gameState;
        gameWon = true;
        endGame();
    }
    input.value = "";
}


function endGame(){
    if(gameWon){
        output.innerHTML = `Arvasit oikein! sinulta kului ${guessesMade} yritystä. Paina Nollaa aloittaaksesi uuden pelin.`;
    }
    else{
        output.innerHTML = `Hävisit pelin! Oikea numero oli ${mysteryNumber}. Paina Nollaa aloittaaksesi uuden pelin.`;

    }
    input.disabled = true;
    button.disabled = true;
    button.removeEventListener("click", clickHandler, false);
    window.removeEventListener("keydown", keydownHandler, false);
}

function resetGame(){
    output.style.color = "black";
    playersGuess = 0;
    input.value = "";
    guessesMade = 0;
    guessesRemaining = 10;
    gameState = "";
    gameWon = false;
    output.textContent = "Arvaa nro väliltä 1 - 100";
    input.disabled = false;
    button.disabled = false;
    button.addEventListener("click", clickHandler, false);
    window.addEventListener("keydown", keydownHandler, false);
}