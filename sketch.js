let brush = 0;
let bx = 50;
let by = 125;
let bw = 30;
let bh = 30;
let by2 = by + bh + 10;
let by3 = by2 + bh + 10;
var count = 1;
var c;

let hueSlider;
let saturationSlider; 
let brightnessSlider;
let sizeSlider;
let hueColor;

function setup() {
  createCanvas(670, 530); 
  background(255);
  colorMode(HSB, 360, 100, 100);
  stroke(0, 0, 35); 
  strokeWeight(7); 
  noFill();

  // Ui Design
  fill(225);
  rect(90, 90, 520, 320, 15); 
  rect(30, 115, 70, 135, 15);
  strokeWeight(10);
  fill(0, 0, 35);
  ellipse(70, 400, 65, 65);
  strokeWeight(0);
  drawStar2(620, 420, 25, 4, PI / 4);
  noStroke();

  // Create sliders for controlling hue, saturation, and brightness
  hueSlider = createSlider(0, 360, 0); // Hue slider
  hueSlider.position(100, 420); // Adjust position
  hueSlider.size(200); // Adjust size

  saturationSlider = createSlider(0, 100, 100); // Saturation slider
  saturationSlider.position(100, 450); // Adjust position
  saturationSlider.size(200); // Adjust size

  brightnessSlider = createSlider(0, 100, 100); // Brightness slider
  brightnessSlider.position(100, 480); // Adjust position
  brightnessSlider.size(200); // Adjust size

  // Create slider for controlling brush size
  sizeSlider = createSlider(5, 50, 15); // Brush size slider
  sizeSlider.position(400, 420); // Adjust position
  sizeSlider.size(200); // Adjust size

  // Create a new interface class for each button and brush.
  b1 = new Interface(bx, by, bw, bh, color(0, 0, 100), color(0, 0, 35), 0); // 1 button
  b2 = new Interface(bx, by2, bw, bh, color(0, 0, 100), color(0, 0, 35), 1); // 2 button
  b3 = new Interface(bx, by3, bw, bh, color(0, 0, 100), color(0, 0, 35), 2); // 3 button

  textSize(14);
  textAlign(CENTER, TOP);
}

function draw() {
  // Draw the button and brush to the canvas.
  b1.button();
  b2.button();
  b3.button();
  b1.brush();
  b2.brush();
  b3.brush();

  // Update hue color
  hueColor = color(hueSlider.value(), saturationSlider.value(), brightnessSlider.value()); // Adjust color based on saturation and brightness

  // Display circle next to the slider
  fill(hueColor);
  ellipse(70, 400, 65, 65);

  // Draw a white star on top of the first button brush

    fill(255);
    drawStar(bx + bw / 2, by + bh / 2, 5, 15, 5); // Adjust parameters as needed


  // Draw a white square on the second button

    fill(255);
    rect(bx + 5, by2 + 5, bw - 10, bh - 10); // Adjust position and size of the square


  // Draw a white circle on top of the third button
    fill(255);
    ellipse(bx + bw / 2, by3 + bh / 2, bw - 10, bh - 10); // Adjust position and size of the circle
  
  // Set text size and alignment
  textSize(14);
  textAlign(CENTER, TOP);
  
  // // Display brush size text
  // fill(0, 0, 35);
  // let brushSizeText = 'Brush Size: ' + sizeSlider.value();
  // text(brushSizeText, 500, 450); // Adjust position as needed
}

// Create an interface class with the button and the brush functions inside.
// Passing in x, y, width, height, button color, button hover color, and brush value.
function Interface(x, y, w, h, c1, c2, b) {
  this.button = function () {
    if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
      if (mouseIsPressed) {
        fill(c1);
        brush = b;
      } else {
        fill(c2);
      }
    } else {
      fill(c2);
    }
    rect(x, y, w, h);
  };
  this.brush = function () {
    // Set brush color based on hue slider
    fill(hueSlider.value(), saturationSlider.value(), brightnessSlider.value());

    // Set brush size based on size slider
    let brushSize = sizeSlider.value();

    // Constrain the mouse coordinates to stay within the canvas
    var bx = constrain(mouseX, 100, 600);
    var by = constrain(mouseY, 100, 400);

    if (brush == b && mouseIsPressed) {
      if (mouseX > 100 && mouseX < 600 && mouseY > 100 && mouseY < 400) {
        if (b == 0) {
          drawStar(bx, by, brushSize / 2, brushSize, 5); // Draw star for brush 1
        } else if (b == 1) {
          rect(bx - brushSize / 2, by - brushSize / 2, brushSize, brushSize); // Draw rectangle for brush 2
        } else if (b == 2) {
          let rndmX = bx + random(-10, 10); // Random movement in x direction
          let rndmY = by + random(-10, 10); // Random movement in y direction
          ellipse(rndmX, rndmY, brushSize, brushSize); 
        }
      }
    }
  };
}

// Function to draw a star shape
function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function drawStar2(x, y, radius1, points, angle) {
  let angleStep = TWO_PI / points;
  beginShape();
  for (let a = -PI / 2; a < TWO_PI - PI / 2; a += angleStep) {
    let sx = x + cos(a) * radius1;
    let sy = y + sin(a) * radius1;
    vertex(sx, sy);
    let innerAngle = a + angle;
    let innerRadius = radius1 * 0.35; // Adjust inner radius for sharper tips
    let ix = x + cos(innerAngle) * innerRadius;
    let iy = y + sin(innerAngle) * innerRadius;
    curveVertex(ix, iy);
    let nextAngle = a + angleStep;
    let nsx = x + cos(nextAngle) * radius1;
    let nsy = y + sin(nextAngle) * radius1;
    vertex(nsx, nsy);
  }
  endShape(CLOSE);
}

function keyPressed() {
  //   keyCode for 'p'
  if (keyCode == 80) {
    saveCanvas(c, 'canvasName' + count, 'jpg');
    count++;
  }
}