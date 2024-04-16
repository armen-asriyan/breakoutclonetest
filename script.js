// Get the canvas element and store it in the canvas variable
const canvas = document.getElementById("gameArea");
// Get the 2D rendering context for the canvas
const ctx = canvas.getContext('2d', { alpha: false });

// Paddle variables
const paddleWidth = 120;
const paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleWidth;

// Ball variables
let ballX = 120;
let ballY = 70;
let ballSpeedX = -2; // Ball speed along the x-axis
let ballSpeedY = -1.5; // Ball speed along the y-axis
let ballWidth = 15;
let ballHeight = 15;

// Variables for user input
let isGameStarted = false;
let isGameOver = false;
let rightPressed = false;
let leftPressed = false;

// Brick variables
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

// Initialize the game
initializeGame();

// Function to initialize the game
function initializeGame() {
    canvas.addEventListener('mousedown', startGame);
    canvas.addEventListener('touchstart', startGame);
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    drawPreGame();
}

// Function to draw the pre-game screen
function drawPreGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "35px VT323";
    ctx.textAlign = "center";
    ctx.fillText("Click on the screen to play", canvas.width / 2, canvas.height / 2);
}


// Function to draw the game elements
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    paddleControls();
    drawBall();
    ballBounce();
}

// Function to draw the paddle
function drawPaddle() {
    ctx.fillStyle = "white";
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
}

// Function to draw the ball
function drawBall() {
    ctx.fillStyle = "white";
    ctx.fillRect(ballX, ballY, ballWidth, ballHeight);
}

function ballBounce() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY + ballSpeedY < 0) { // Ball is about to hit the top wal
        ballSpeedY = -ballSpeedY; // Invert y-direction on top collision
    } else if (ballY + ballSpeedY > canvas.height) { // Ball is about to hit the bottom wall
        // gameOver();
    }


    // Ball is about to hit the left wall
    if (ballX + ballSpeedX < 0) {
        ballSpeedX = -ballSpeedX; // Invert x-direction on left collision 
        // Ball is about to hit the right wall
    } else if (ballX + ballSpeedX > canvas.width) {
        ballSpeedX = -ballSpeedX; // Invert x-direction on right collision 
    }
}

function paddleControls() {
    // Update paddle position based on pressed keys
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 5; // Adjust speed as needed
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 5; // Adjust speed as needed
    }
}

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


