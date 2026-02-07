/* Minimal Pong game: player left (W/S), simple AI right, scoring, pause */
(() => {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const W = canvas.width; const H = canvas.height;

  const paddle = (x)=>({x, y: H/2 - 50, w: 12, h: 100, speed: 6});
  const left = paddle(16);
  const right = paddle(W - 28);

  const ball = {x: W/2, y: H/2, r: 8, speed: 6, vx: 0, vy: 0};
  let leftScore = 0, rightScore = 0;
  let paused = false;

  const keys = {w:false,s:false};

  function randSign(){return Math.random() < 0.5 ? -1 : 1}
  function resetBall(pushRight){
    ball.x = W/2; ball.y = H/2; ball.speed = 6;
    const angle = (Math.random()*0.6 - 0.3);
    ball.vx = (pushRight ? 1 : -1) * Math.cos(angle) * ball.speed;
    ball.vy = Math.sin(angle) * ball.speed;
    paused = true;
    setTimeout(()=> paused = false, 700);
  }

  function drawNet(){
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    const step = 20; for(let y=0;y<H;y+=step*2){ctx.fillRect(W/2-1,y,2,step)}
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    drawNet();
    // paddles
    ctx.fillStyle = '#e6eef8';
    ctx.fillRect(left.x,left.y,left.w,left.h);
    ctx.fillRect(right.x,right.y,right.w,right.h);
    // ball
    ctx.beginPath(); ctx.fillStyle = '#38bdf8'; ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2); ctx.fill();
  }

  function clamp(v,a,b){return Math.max(a, Math.min(b, v))}

  function update(){
    if(!paused){
      // player input
      if(keys.w) left.y -= left.speed; if(keys.s) left.y += left.speed;
      left.y = clamp(left.y, 0, H - left.h);

      // simple AI: follow ball with limited speed
      const target = ball.y - right.h/2;
      const aiSpeed = 4.2;
      if(target < right.y - 6) right.y -= aiSpeed; else if(target > right.y + 6) right.y += aiSpeed;
      right.y = clamp(right.y, 0, H - right.h);

      // ball movement
      ball.x += ball.vx; ball.y += ball.vy;

      // top/bottom collision
      if(ball.y - ball.r <= 0 || ball.y + ball.r >= H){ ball.vy *= -1; }

      // paddle collisions
      function paddleHit(p){
        return ball.x - ball.r < p.x + p.w && ball.x + ball.r > p.x && ball.y + ball.r > p.y && ball.y - ball.r < p.y + p.h;
      }

      if(paddleHit(left) && ball.vx < 0){
        // reflect
        const rel = (ball.y - (left.y + left.h/2)) / (left.h/2);
        const ang = rel * 0.6; // tilt angle
        ball.speed *= 1.03; ball.vx = Math.cos(ang) * ball.speed; ball.vy = Math.sin(ang) * ball.speed;
      }
      if(paddleHit(right) && ball.vx > 0){
        const rel = (ball.y - (right.y + right.h/2)) / (right.h/2);
        const ang = rel * 0.6;
        ball.speed *= 1.03; ball.vx = -Math.cos(ang) * ball.speed; ball.vy = Math.sin(ang) * ball.speed;
      }

      // scoring
      if(ball.x < -ball.r){ rightScore++; document.getElementById('rightScore').textContent = rightScore; resetBall(true); }
      if(ball.x > W + ball.r){ leftScore++; document.getElementById('leftScore').textContent = leftScore; resetBall(false); }
    }
  }

  function loop(){ update(); draw(); requestAnimationFrame(loop); }

  // input
  window.addEventListener('keydown', (e)=>{
    if(e.key === 'w' || e.key === 'W') keys.w = true;
    if(e.key === 's' || e.key === 'S') keys.s = true;
    if(e.code === 'Space'){ paused = !paused; }
  });
  window.addEventListener('keyup', (e)=>{ if(e.key === 'w' || e.key === 'W') keys.w = false; if(e.key === 's' || e.key === 'S') keys.s = false; });

  // tap/click to unpause/start
  canvas.addEventListener('click', ()=>{ paused = false; });

  // init
  resetBall(randSign() > 0);
  document.getElementById('leftScore').textContent = leftScore;
  document.getElementById('rightScore').textContent = rightScore;
  requestAnimationFrame(loop);
})();
