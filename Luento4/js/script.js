const gameFPS = 60;
const canvas = document.querySelector("#c");
const ctx = canvas.getContext("2d");
const ball = {
    x: 160,
    y: 240,
    xSpeed: 1,
    ySpeed: 3,
    radius: 10
};
let pointsPlayer = 0;
let pointsComputer = 0;
const paddleWidth = 100;
const paddleHeight = 10;

const topPaddle = {
    x: canvas.width/2 - paddleWidth/2,
    y: 10 
}
const bottomPaddle = {
    x: canvas.width/2 - paddleWidth/2 ,
    y: canvas.height - 20 
}

leftArrowHit = false;
rightArrowHit = false;

window.addEventListener("keydown", keydownHandler, true);

function keydownHandler(e){
    if (e.keyCode === 37){
        leftArrowHit = true;
    }
    if (e.keyCode === 39){
        rightArrowHit = true;
    }
}

function keyboardEvents() {
    if (leftArrowHit && bottomPaddle.x > 0) {
        bottomPaddle.x -= 3;
        leftArrowHit = false;
    }
    if (rightArrowHit && bottomPaddle.x < canvas.width - paddleWidth  ) {
        bottomPaddle.x += 3;
        rightArrowHit = false;
    }
}

function computerAI() {
    if (ball.ySpeed < 0) {
        if (ball.x < topPaddle.x + paddleWidth/2 ) {
            topPaddle.x--;
        }
        else{
            topPaddle.x++;
        }

    if (topPaddle.x > 0) {
        topPaddle.x -= 3;
    }
    if (topPaddle.x < canvas.width - paddleWidth  ) {
        topPaddle.x += 3;
    }
    }
}






function drawBackground() {
    ctx.fillStyle = "#dbdbdb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function drawBall() {
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#ffff00"
    ctx.beginPath();
    ball.x += ball.xSpeed;
    ball.y += ball.ySpeed;
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI, true);
    ctx.fill();
    ctx.stroke();
    // if (ball.x >= canvas.width || ball.x <= 0) {
    //     ball.xSpeed = -ball.xSpeed;
    // }
    // if (ball.y >= canvas.height || ball.y < 0) {
    //     ball.ySpeed = -ball.ySpeed;
    // }
}

function drawTopPaddle() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(topPaddle.x, topPaddle.y, paddleWidth, paddleHeight);
}
function drawBottomPaddle() {
ctx.fillStyle = "#000000";
ctx.fillRect(bottomPaddle.x, bottomPaddle.y, paddleWidth, paddleHeight);
}

function hitDetect() {
  if (ball.y + ball.radius >= bottomPaddle.y) {
    if (bottomPaddle.x <= ball.x && ball.x <= bottomPaddle.x + paddleWidth) {
      ball.ySpeed = ball.ySpeed * -1;
      ball.y = bottomPaddle.y - ball.radius;
      return;
    }
  }
  if (ball.y - ball.radius <= topPaddle.y + paddleHeight) {
    if (topPaddle.x <= ball.x && ball.x <= topPaddle.x + paddleWidth) {
      ball.ySpeed = ball.ySpeed * -1;
      ball.y = topPaddle.y + ball.radius + paddleHeight;
      return;
    }
  }
  if (ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0) {
    ball.xSpeed = ball.xSpeed * -1;
  }
  if (ball.y > canvas.height + ball.radius) {
    pointsComputer++;
    initGameObjects(); // a new ball in the game
    // console.log("point for computer", pointsComputer);
  }
  if (ball.y < 0 - ball.radius) {
    pointsPlayer++;
    initGameObjects(); // a new ball in the game
    console.log("point for player", pointsPlayer);
  }
}

const initGameObjects = () => {
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    topPaddle.x = canvas.width/2 - paddleWidth/2;
    bottomPaddle.x = canvas.width/2 - paddleWidth/2;
    drawBall();
    drawTopPaddle();
    drawBottomPaddle();    
}

  function drawScore() {
  ctx.font = "bold Arial 16px";
  ctx.fillText("Player: " + pointsPlayer + " Computer: " + pointsComputer, 10, canvas.height / 2);
}

function pongGame() {
    drawBackground();
    drawTopPaddle();
    drawBall();
    drawBottomPaddle();
    hitDetect();
    keyboardEvents();
    computerAI();
    drawScore();
}

window.setInterval(pongGame, 1000/gameFPS);