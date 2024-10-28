// Variables for the position and speed of the square
let x = 175; 
let y = 175; 
let size = 50; 
let speed = 5; 

// Variables for enabling jump
let jumping = false; 
let jumpSpeed = 0; 
let gravity = 0.5; 

// Obstacles (rectangles)
let obstacles = [
  { x: 100, y: 300, width: 150, height: 20 },  
  { x: 300, y: 200, width: 100, height: 20 },  
];


function setup() {
  // Create a 400x400 pixel canvas where everything will be drawn
  createCanvas(400, 400);
}

function draw() {
  // Draw a white background each frame to update elements (prevents the square from leaving a trail)
  background(220);
  
  // Draw the square
  fill(255, 0, 0); 
  rect(x, y, size, size); 

  // Draw obstacles
  fill(0, 0, 255); // Blue fill for the obstacles
  for (let obstacle of obstacles) {
    // Draw each obstacle using its position and size properties
    rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  }

// Logic for jumping and gravity
if (jumping) { 
  y += jumpSpeed; 
  jumpSpeed += gravity; 

  // Limit the square to the bottom of the canvas (prevents it from falling indefinitely)
  if (y + size >= height) {
    y = height - size; // Set the square's position to rest on the bottom
    jumping = false; 
    jumpSpeed = 0; 
  }
}
  // Check for collisions with obstacles
  for (let obstacle of obstacles) {
    if (collidesWithRectangle(x, y, size, size, obstacle.x, obstacle.y, obstacle.width, obstacle.height)) {
      fill(255, 255, 0); 
      rect(x, y, size, size); 
    }
  }
  // Limit square position within canvas boundaries
  x = constrain(x, 0, width - size); 
  y = constrain(y, 0, height - size); 
}

function keyPressed() {
  // Move left when the left arrow key is pressed
  if (keyCode === LEFT_ARROW) {
    x -= speed; 
  }
  // Move right when the right arrow key is pressed
  if (keyCode === RIGHT_ARROW) {
    x += speed; 
  }
  // Move up when the up arrow key is pressed
  if (keyCode === UP_ARROW) {
    y -= speed; 
  }
  // Move down when the down arrow key is pressed
  if (keyCode === DOWN_ARROW) {
    y += speed; 
  }
  // Make the square jump when the spacebar is pressed
  if (key === ' ' && !jumping) {
    jumping = true; 
    jumpSpeed = -10; 
  }
}

// Function to detect collisions between two rectangles
// Receives the positions and sizes of both rectangles
function collidesWithRectangle(x1, y1, w1, h1, x2, y2, w2, h2) {
  // Returns true if there is an intersection between the two rectangles, false otherwise
  return (
    x1 < x2 + w2 && // The left edge of the square is to the left of the right edge of the obstacle
    x1 + w1 > x2 && // The right edge of the square is to the right of the left edge of the obstacle
    y1 < y2 + h2 && // The top edge of the square is above the bottom edge of the obstacle
    y1 + h1 > y2    // The bottom edge of the square is below the top edge of the obstacle
  );
}
