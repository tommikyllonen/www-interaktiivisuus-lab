import { Point } from "./modules/Point.js"
import { Rectangle } from "./modules/Rectangle.js"

let selectedRectangle = null
const gameFPS = 60;
const canvas = document.querySelector("#c");
canvas.width = 800;
canvas.height = 600;
const ctx = canvas.getContext("2d");
let arrowKeySpeed = 5;


//event listeners for arrow keys
window.addEventListener("keydown", (e) => {
    if (selectedRectangle == null) {
        showMessage("Select a rectangle first")
        return
    }

    if (e.code == "ArrowUp") selectedRectangle.keyboardMove("ArrowUp", arrowKeySpeed)
    else if (e.code == "ArrowDown") selectedRectangle.keyboardMove("ArrowDown", arrowKeySpeed)
    else if (e.code == "ArrowLeft") selectedRectangle.keyboardMove("ArrowLeft", arrowKeySpeed)
    else if (e.code == "ArrowRight") selectedRectangle.keyboardMove("ArrowRight", arrowKeySpeed)
})

//event listeners for button clicks//

//Change selected rectangle and display it to user
document.querySelector(".select-blue").addEventListener("click", () => {
    selectActiveRectangle("blue")
})

//open the instruction pdf
document.querySelector(".instructions-btn").addEventListener("click", () => {
    window.open('materials/instructions.pdf', '_blank')
})

//Change selected rectangle and display the information to user on the top left corner
document.querySelector(".select-red").addEventListener("click", () => {
    selectActiveRectangle("red")
})
const selectActiveRectangle = (color) => {
    if (color === "blue") {
        selectedRectangle = rect1
        document.querySelector(".active-rectangle-blue").style.display = "block";
        document.querySelector(".active-rectangle-red").style.display = "none";
    }
    if (color === "red") {

        selectedRectangle = rect2
        document.querySelector(".active-rectangle-red").style.display = "block";
        document.querySelector(".active-rectangle-blue").style.display = "none";
    }
}

const Showinputs = (action) => {
    if (action == "modify") {
        document.querySelector(".modify-rectangle-container").style.display = "block";
        document.querySelector(".move-rectangle-to-container").style.display = "none";
    }
    else if (action == "move") {
        document.querySelector(".modify-rectangle-container").style.display = "none";
        document.querySelector(".move-rectangle-to-container").style.display = "block";
    }
}


// ------------------Move Rectangles to--------------------------------
document.querySelector(".move-blue").addEventListener("click", () => {
    Showinputs("move")
    selectActiveRectangle("blue")
    document.querySelector(".show-move-color").textContent = " Blue "
})

document.querySelector(".move-red").addEventListener("click", () => {
    Showinputs("move");
    selectActiveRectangle("red")
    document.querySelector(".show-move-color").textContent = " Red "
})


// Move Selected rectangle to a specific location
document.querySelector(".submit-coordinates").addEventListener("click", () => {
    if (selectedRectangle == null) showMessage("Please select a rectangle first")
    const x = parseInt(document.querySelector("#x-coordinate").value) ?? null
    const y = parseInt(document.querySelector("#y-coordinate").value) ?? null

    let message = selectedRectangle.move(x, y, canvas)
    if (message) showMessage(message)
})


//---------------MODIFY RECTANGLE---------------------------
const form = document.querySelector(".update-rectangle-form")
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const data = new FormData(form);
    let message = selectedRectangle.modify(data, canvas)
    if (message) showMessage(message)
});

// Modify rectangle sizes (Not colors, because I decided not to :) )
document.querySelector(".modify-blue").addEventListener("click", () => {
    selectActiveRectangle("blue")
    Showinputs("modify")
    document.querySelector(".show-modify-color").textContent = " Blue "
})

document.querySelector(".modify-red").addEventListener("click", () => {
    selectActiveRectangle("red")
    Showinputs("modify");
    document.querySelector(".show-modify-color").textContent = " Red "
})




const rect1 = new Rectangle(100, 300, 150, 100, '#35359e')
const rect2 = new Rectangle(200, 200, 80, 80, '#9e3535')
const showMessage = (message) => {
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

const playTheGame = () => {
    drawBackground();
    rect1.drawRectangle(ctx);
    rect2.drawRectangle(ctx);
    if (rect1.overlap(rect2)) {
        rect1.color = "red"
        rect2.color = "red"
    }
    else {
        rect1.color = '#35359e'
        rect2.color = '#9e3535'
    }
}

window.setInterval(playTheGame, 1000 / gameFPS);