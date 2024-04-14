// Get the canvas element and store it in the canvas variable
const canvas = document.getElementById("gameArea");
// creating the ctx variable to store the 2D rendering context,
// the actual tool we can use to paint on the Canvas  
const ctx = canvas.getContext('2d', { alpha: false });

// PADDLE VARIABLES

// Paddle default width and height
const paddleWidth = 80;
const paddleHeight = 2.5;
// Store paddle's x(horizontal) position in a variable then
// put it on the center of the canvas
let paddleX = (canvas.width - paddleWidth) / 2;

// BALL VARIABLES

// variables for the x and y position of the "ball"
let x = 120;
let y = 70;
// variables to change position of the "ball"
let dx = -2;
let dy = -1.5;


// VARIABLES FOR USER INPUT

// Booleans for keyboard buttons
let gameStarted = false;
let rightPressed = false;
let leftPressed = false;


// VARIABLES FOR THE BRICKS
// Brick OBJECT
const brick = {
    rowCount: 8,
    columnCount: 8,
    width: 60,
    height: 2,
    padding: 10,
    offsetTop: 30,
    offsetLeft: 30,
    isBroken: false
}

let animationId;


canvas.addEventListener('mousedown', startGame);
canvas.addEventListener('touchstart', startGame);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
drawPreGame();

function drawPreGame() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw a text saying tap to start the game
    ctx.fillStyle = "white";
    ctx.font = "20px VT323";
    ctx.textAlign = "center";
    ctx.fillText("Tap on the screen to play", canvas.width / 2, canvas.height / 2);
}

function drawGame() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the paddle
    ctx.fillStyle = "white";
    ctx.fillRect(paddleX, 120, paddleWidth, paddleHeight);

    // Draw the "ball"
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, 7, 3);

    // Update ball position based on dx and dy
    x += dx;
    y += dy;


    // Bounce from the walls
    bounce();


    // Update paddle position based on pressed keys
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 5; // Adjust speed as needed
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 5; // Adjust speed as needed
    }
}


function bounce() {
    // Ball is about to hit the top wall
    if (y + dy < 0) {
        dy = -dy; // Invert y-direction on top collision

        // Ball is about to hit the bottom wall
    } else if (y + dy > canvas.height) {
        // Display Game Over screen
        // gameOver();
    }
    // Ball is about to hit the left wall
    if (x + dx < 0) {
        dx = -dx; // Invert x-direction on left collision 
        // Ball is about to hit the right wall
    } else if (x + dx > canvas.width) {
        dx = -dx; // Invert x-direction on right collision 
    }
}

// BRICK FUNCIONALITY 


function keyDownHandler(event) {
    // Update booleans for pressed keys
    if (event.key === "ArrowRight") {
        rightPressed = true;
    } else if (event.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(event) {
    // Update booleans for released keys
    if (event.key === "ArrowRight") {
        rightPressed = false;
    } else if (event.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function gameOver() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "20px VT323";
    ctx.textAlign = "center";
    ctx.fillText("You lost, tap to try again", canvas.width / 2, canvas.height / 2);
}

function gameLoop() {
    animationId = requestAnimationFrame(gameLoop);
    drawGame();
}

function startGame() {
    gameLoop();
    canvas.removeEventListener('mousedown', startGame);
    canvas.removeEventListener('touchstart', startGame);

}


