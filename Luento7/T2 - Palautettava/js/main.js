import { Point } from "./modules/Point.js"
import { Rectangle } from "./modules/Rectangle.js"

let selectedRectangle = null
const gameFPS = 60;
const canvas = document.querySelector("#c");
canvas.width = 800
canvas.height = 600
const ctx = canvas.getContext("2d");



//event listeners for key presses
window.addEventListener("keydown", (e) => {
    if(selectedRectangle == null) {
        showMessage("Select a rectangle first")   
        return
    }
    if(e.code == "ArrowUp" ) selectedRectangle.keyboardMove("ArrowUp")
    else if(e.code == "ArrowDown" ) selectedRectangle.keyboardMove("ArrowDown")
    else if(e.code == "ArrowLeft" ) selectedRectangle.keyboardMove("ArrowLeft")
    else if(e.code == "ArrowRight" ) selectedRectangle.keyboardMove("ArrowRight")
})

//event listeners for button clicks
document.querySelector(".select-blue").addEventListener("click", () => {
    selectedRectangle = rect1
    document.querySelector(".active-rectangle-blue").style.display = "block";
    document.querySelector(".active-rectangle-red").style.display = "none";
})

document.querySelector(".select-red").addEventListener("click", () => {
    selectedRectangle = rect2
    document.querySelector(".active-rectangle-red").style.display = "block";
    document.querySelector(".active-rectangle-blue").style.display = "none";
})


document.querySelector(".submit-coordinates").addEventListener("click", () => {
    if(selectedRectangle == null) showMessage("Please select a rectangle first")
    const x = parseInt(document.querySelector("#x-coordinate").value) ?? null
    const y = parseInt(document.querySelector("#y-coordinate").value) ?? null
    if (x !== null){
        hoida nää!!!!
        if(x < 0) showMessage("Cannot move outside the canvas, min x value is 0")
        else if(x + selectedRectangle.width > 800) showMessage("Cannot move outside the canvas, max x value is 800 - rectangle width")
        else    
    selectedRectangle.left = x
    }
    if (y !== null){
        if(y < 0) showMessage("Cannot move outside the canvas, min y value is 0")
        else if(y + selectedRectangle.height > 600) showMessage("Cannot move outside the canvas, max y value is 600 - rectangle height")
        else    
    selectedRectangle.top = y
    }
    if (isNaN(x) || isNaN(y)) showMessage("Please enter only numbers")
    if (x === null && y === null) showMessage("Please enter at least one coordinate")
})


const rect1 = new Rectangle(100, 300, 150, 100, '#35359e')
const rect2 = new Rectangle(200, 200, 80, 80, '#9e3535')
const showMessage = (message) =>{
    document.querySelector(".show-message").style.display = "block";
    document.querySelector(".show-message").textContent = message;
    // display for 5 seconds and then hide
    setTimeout(() => {
        document.querySelector(".show-message").textContent = "";
        document.querySelector(".show-message").style.display = "none";
    }, 3000);
}

function drawBackground() {
    ctx.fillStyle = "#794f92";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const playTheGame =  () => {
    drawBackground();
    rect1.drawRectangle(ctx);
    rect2.drawRectangle(ctx);
    if(rect1.overlap(rect2) ){
        rect1.color = "red"
        rect2.color = "red"
    }
    else{
        rect1.color = '#35359e'
        rect2.color = '#9e3535'
    }
}

window.setInterval(playTheGame, 1000/gameFPS);