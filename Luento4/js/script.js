const gameFPS = 60;
const canvas = document.querySelector("#c");
const ctx = canvas.getContext("2d");

//ball object
const ball = {
    x: 160,
    y: 240,
    xSpeed: 1,
    ySpeed: 3
};

function drawBackground() {
    ctx.fillStyle = "#dbdbdb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawTopPaddle() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(100,10,100,10);
}

function drawBall() {
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#ffff00"
    ctx.beginPath();
    ball.x += ball.xSpeed;
    ball.y += ball.ySpeed;
    ctx.arc(ball.x, ball.y, 10, 0, 2*Math.PI, true);
    ctx.fill();
    ctx.stroke();
    if (ball.x > canvas.width -10 || ball.x <= 10) {
        ball.xSpeed = ball.xSpeed * -1;
    }
    if (ball.y > canvas.height-10 || ball.y < 10) {
        ball.ySpeed = ball.ySpeed * -1;
    }
}

function drawBottomPaddle() {
// paddle 2
ctx.fillStyle = "#000000";
ctx.fillRect(100,canvas.height-20,100,10);
}

function pongGame() {
    drawBackground();
    drawTopPaddle();
    drawBall();
    drawBottomPaddle();
}

window.setInterval(pongGame, 1000/gameFPS);