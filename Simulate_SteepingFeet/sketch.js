
let BAR_W = 20;            
let trailOn = true;        
let SPEED_TOP = 2;        
let SPEED_BOTTOM = 2;      
let showHint = true;       


class Brick{
  constructor(bc, y){
    this.brickColor = bc;
    this.yPos = y;
    this.xPos = 0;
    this.xSpeed = 1;
    this.w = 100;
    this.h = 50;
  }

  createBrick(){
    fill(this.brickColor);
    rect(this.xPos, this.yPos, this.w, this.h);
  }

  setSpeed(s = 1){
    this.xSpeed = s;
  }

  moveBrick(){
    this.xPos += this.xSpeed;
    if (this.xPos + this.w >= width || this.xPos <= 0){
      this.xSpeed *= -1;
    }
  }

  reset(){
    this.xPos = 0;
  }
}

function setup() {
  createCanvas(2400, 900);


  createP("Keep the mouse clicked").style('color','#ffffff');
  createP("to check whether the bricks").style('color','#ffffff');
  createP("are moving at same speed or not").style('color','#ffffff');
}


let brick1 = new Brick("white", 100);
let brick2 = new Brick("black", 250);


brick1.setSpeed(SPEED_TOP);
brick2.setSpeed(SPEED_BOTTOM);

function draw () {
  // background
  if (trailOn) {
    // change
    if (frameCount === 1) background(0);
    noStroke();
        // press
    fill(mouseIsPressed ? 50 : 0, 40); 
    rect(0, 0, width, height);
  } else {
    background(mouseIsPressed ? 50 : 0);
  }

  // change color
  if (mouseIsPressed) {
    brick1.brickColor = color(255, 220);     
    brick2.brickColor = color(255, 140, 0);  
  } else {
    brick1.brickColor = "white";
    brick2.brickColor = "black";
  }


  brick1.createBrick();
  brick1.moveBrick();

  if (!mouseIsPressed){
    createBars();
  } else {
    createBars();
  }


  brick2.createBrick();
  brick2.moveBrick();

  drawHUD();
}


function createBars() {
  for (let i = 0; i < width / BAR_W; i++){
    if (!mouseIsPressed) {
      fill("white");
      if (i % 2 === 0) rect(i * BAR_W, height, BAR_W, -height);
    } else {
      fill("black");
      if (i % 2 === 0) rect(i * BAR_W, height, BAR_W, -height);
    }
  }
}

function drawHUD(){
  noStroke();
  fill(255);
  textSize(13);
  const info = `Top(W/S): ${abs(brick1.xSpeed).toFixed(1)}   Bottom(I/K): ${abs(brick2.xSpeed).toFixed(1)}   Bars(←/→): ${BAR_W}`;
  text(info, 12, height - 28);
  if (showHint) {
    text("↑/↓ 同调速度   W/S 上砖速度   I/K 下砖速度   ←/→ 条纹宽度   T 拖影   R 重置", 12, height - 10);
  }
}


function keyPressed() {
  if (keyCode === UP_ARROW) {
    changeBothSpeed(+0.5);
  } else if (keyCode === DOWN_ARROW) {
    changeBothSpeed(-0.5);
  } else if (keyCode === RIGHT_ARROW) {
    BAR_W = min(BAR_W + 2, 60);
  } else if (keyCode === LEFT_ARROW) {
    BAR_W = max(BAR_W - 2, 6);
  } else if (key === 'w' || key === 'W') {
    brick1.xSpeed = stepSigned(brick1.xSpeed, +0.5);
  } else if (key === 's' || key === 'S') {
    brick1.xSpeed = stepSigned(brick1.xSpeed, -0.5);
  } else if (key === 'i' || key === 'I') {
    brick2.xSpeed = stepSigned(brick2.xSpeed, +0.5);
  } else if (key === 'k' || key === 'K') {
    brick2.xSpeed = stepSigned(brick2.xSpeed, -0.5);
  } else if (key === 't' || key === 'T') {
    trailOn = !trailOn;
  } else if (key === 'r' || key === 'R') {
    brick1.reset();
    brick2.reset();
  }
  showHint = false;
}

// same speed
function changeBothSpeed(delta){
  brick1.xSpeed = stepSigned(brick1.xSpeed, delta);
  brick2.xSpeed = stepSigned(brick2.xSpeed, delta);
}


function stepSigned(v, delta){
  const sgn = v >= 0 ? 1 : -1;
  let mag = constrain(abs(v) + delta, 0.5, 10);
  return sgn * mag;
}
