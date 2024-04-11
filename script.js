//get the canvas element and store it in the canvas variable
const canvas = document.getElementById("gameArea");
//creating the ctx variable to store the 2D rendering context,
//the actual tool we can use to paint on the Canvas  
const ctx = canvas.getContext('2d');

//store paddle's x(horizontal) position in a variable
let paddleX = 120;

//variables for the x and y position of the "ball"
let x = 120;
let y = 70;
//variables to change position of the "ball"
let dx = -4;
let dy = -1.5;

function draw() {
    //clear canvas
    //takes four parameters:
    //the x and y coordinates of the top left corner of a rectangle
    //and the x and y coordinates of the bottom right corner of a rectangle.
    //The whole area covered by this rectangle
    //will be cleared of any content previously painted there.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //draw the paddle
    ctx.fillStyle = "white";
    ctx.fillRect(paddleX, 120, 70, 2);
    //draw the "ball"
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, 9, 3);
    x += dx;
    y += dy;
}
setInterval(draw, 10);


