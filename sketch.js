// Variables for the position and speed of the square
let x = 175; // Initial position on the X axis
let y = 175; // Initial position on the Y axis
let size = 50; // Size of the square (50x50 pixels)
let speed = 5; // Speed of the square's movement

// Variables for enabling jump
let jumping = false; // Variable to track if the square is in the air (jumping)
let jumpSpeed = 0; // Speed of the square when jumping
let gravity = 0.5; // Gravity that affects the square while it's in the air

// Obstacles (rectangles)
let obstacles = [
  { x: 100, y: 300, width: 150, height: 20 },  // Obstacle 1 (position and size)
  { x: 300, y: 200, width: 100, height: 20 },  // Obstacle 2 (position and size)
];

function setup() {
  // Create a 400x400 pixel canvas where everything will be drawn
  createCanvas(400, 400);
}

function draw() {
  // Draw a white background each frame to update elements (prevents the square from leaving a trail)
  background(220);
  
  // Draw the square
  fill(255, 0, 0); // Red fill for the square
  rect(x, y, size, size); // Draw the square at position x, y, with the defined size

  // Draw obstacles
  fill(0, 0, 255); // Blue fill for the obstacles
  for (let obstacle of obstacles) {
    // Draw each obstacle using its position and size properties
    rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  }

  // Logic for jumping
  if (jumping) { 
    // If the square is in the air (jumping), update its Y position
    y += jumpSpeed; // Change the square's position based on the jump speed
    jumpSpeed += gravity; // The jump speed decreases due to gravity

    // Limit the square to the ground (prevents it from falling indefinitely)
    if (y >= 175) {
      y = 175; // Keep the square on the ground (initial Y position)
      jumping = false; // Stop jumping once it touches the ground
      jumpSpeed = 0; // Reset the jump speed
    }
  }

  // Check for collisions with obstacles
  for (let obstacle of obstacles) {
    // If the square collides with an obstacle, change its color to yellow
    if (collidesWithRectangle(x, y, size, size, obstacle.x, obstacle.y, obstacle.width, obstacle.height)) {
      fill(255, 255, 0); // Change the square's color to yellow in case of a collision
      rect(x, y, size, size); // Redraw the square, but now in yellow
    }
  }
}

function keyPressed() {
  // Move left when the left arrow key is pressed
  if (keyCode === LEFT_ARROW) {
    x -= speed; // Decrease the X position to move the square left
  }
  // Move right when the right arrow key is pressed
  if (keyCode === RIGHT_ARROW) {
    x += speed; // Increase the X position to move the square right
  }
  // Move up when the up arrow key is pressed
  if (keyCode === UP_ARROW) {
    y -= speed; // Decrease the Y position to move the square up
  }
  // Move down when the down arrow key is pressed
  if (keyCode === DOWN_ARROW) {
    y += speed; // Increase the Y position to move the square down
  }
  // Make the square jump when the spacebar is pressed
  if (key === ' ' && !jumping) {
    jumping = true; // Activate jumping state
    jumpSpeed = -10; // Give an initial upward force (negative to go up)
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
