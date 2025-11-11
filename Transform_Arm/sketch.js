
let x, y;
let angle1 = 0.0;
let angle2 = 0.0;
let segLength = 100;

function setup() {
  createCanvas(2400, 900);  
  strokeWeight(30);
  stroke(255, 160);
  x = width * 0.5;
  y = height * 0.5;
}

function draw() {
  background(0, 40);

  // change
  let r = 150 + 105 * sin(frameCount * 0.03);
  let g = 200 + 55 * sin(frameCount * 0.05);
  stroke(r, g, 255, 200);

  let sw = map(mouseY, 0, height, 10, 40);
  strokeWeight(sw);

  angle1 = (mouseX / float(width) - 0.5) * -TWO_PI;
  angle2 = (mouseY / float(height) - 0.5) * PI;

  push();
  translate(width / 2, height / 2);  
  segment(0, 0, angle1);             
  segment(segLength, 0, angle2);
  fill(255, 180);
  noStroke();
  circle(segLength, 0, 20);
  pop();
}


function segment(x, y, a) {
  translate(x, y);
  rotate(a);
  strokeWeight(6);
  line(0, 0, segLength, 0);
}
