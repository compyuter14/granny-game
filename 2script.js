const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

let player = {
    x: 100,
    y: 300,
    width: 30,
    height: 30,
    speed: 5,
    color: "blue",
    health: 100
};

let granny = {
    x: 700,
    y: 50,
    width: 40,
    height: 40,
    speed: 2,
    color: "red"
};

let timeLeft = 60;
let gameInterval;
let movement = { up: false, down: false, left: false, right: false };

document.getElementById("startButton").addEventListener("click", startGame);

function startGame() {
    // Reset player and granny positions
    player.x = 100;
    player.y = 300;
    granny.x = 700;
    granny.y = 50;
    timeLeft = 60;
    player.health = 100;
    
    // Start the game loop
    gameInterval = setInterval(gameLoop, 1000 / 60); // 60 FPS
    document.getElementById("time").innerText = timeLeft;
    document.getElementById("health").innerText = player.health;

    // Start countdown for time left
    setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("time").innerText = timeLeft;
        }
    }, 1000);
}

function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move the player
    if (movement.up && player.y > 0) player.y -= player.speed;
    if (movement.down && player.y < canvas.height - player.height) player.y += player.speed;
    if (movement.left && player.x > 0) player.x -= player.speed;
    if (movement.right && player.x < canvas.width - player.width) player.x += player.speed;

    // Move Granny
    moveGranny();

    // Check for collisions (simple)
    if (isCollision(player, granny)) {
        player.health -= 1;
        document.getElementById("health").innerText = player.health;
    }

    // Draw player and granny
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = granny.color;
    ctx.fillRect(granny.x, granny.y, granny.width, granny.height);

    // End game if player runs out of health or time
    if (player.health <= 0 || timeLeft <= 0) {
        clearInterval(gameInterval);
        alert(player.health <= 0 ? "Game Over! Granny caught you!" : "Game Over! Time's up!");
    }
}

// Granny AI to move towards the player
function moveGranny() {
    if (granny.x < player.x) granny.x += granny.speed;
    if (granny.x > player.x) granny.x -= granny.speed;
    if (granny.y < player.y) granny.y += granny.speed;
    if (granny.y > player.y) granny.y -= granny.speed;
}

// Collision detection
function isCollision(player, granny) {
    return player.x < granny.x + granny.width &&
           player.x + player.width > granny.x &&
           player.y < granny.y + granny.height &&
           player.y + player.height > granny.y;
}

// Listen for player movement
window.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp") movement.up = true;
    if (e.key === "ArrowDown") movement.down = true;
    if (e.key === "ArrowLeft") movement.left = true;
    if (e.key === "ArrowRight") movement.right = true;
});

window.addEventListener("keyup", function (e) {
    if (e.key === "ArrowUp") movement.up = false;
    if (e.key === "ArrowDown") movement.down = false;
    if (e.key === "ArrowLeft") movement.left = false;
    if (e.key === "ArrowRight") movement.right = false;
});