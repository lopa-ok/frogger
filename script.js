const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

const playerSize = 40;
let playerX = canvas.width / 2 - playerSize / 2;
let playerY = canvas.height - playerSize;

let level = 1;
let score = 0;
let isGameOver = false;

let cars = [
    { x: 0, y: 60, speed: 2 },
    { x: 150, y: 150, speed: 3 },
    { x: 300, y: 240, speed: 4 },
];

function drawPlayer() {
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(playerX, playerY, playerSize, playerSize);
}

function drawCars() {
    cars.forEach(car => {
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(car.x, car.y, playerSize, playerSize);
    });
}

function moveCars() {
    cars.forEach(car => {
        car.x += car.speed;
        if (car.x > canvas.width) car.x = -playerSize;
    });
}

function checkCollision() {
    for (const car of cars) {
        if (playerX < car.x + playerSize &&
            playerX + playerSize > car.x &&
            playerY < car.y + playerSize &&
            playerY + playerSize > car.y) {
            triggerGameOver();
        }
    }
}

function resetPlayer() {
    playerX = canvas.width / 2 - playerSize / 2;
    playerY = canvas.height - playerSize;
}

function levelUp() {
    level++;
    score += 10;
    cars.forEach(car => car.speed += 0.5); // Increase car speed with each level
}

function checkWin() {
    if (playerY < 0) {
        levelUp();
        resetPlayer(); // Reset the player's position but keep the level and score
    }
}

function drawScore() {
    ctx.fillStyle = '#fff';
    ctx.font = '20px "Press Start 2P"';
    ctx.fillText(`Level: ${level}`, 10, 30);
    ctx.fillText(`Score: ${score}`, 10, 60);
}

function drawGameOver() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.font = '30px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 20);
    ctx.font = '20px "Press Start 2P"';
    ctx.fillText('Press R to Restart', canvas.width / 2, canvas.height / 2 + 20);
}

function triggerGameOver() {
    isGameOver = true;
    drawGameOver();
}

function restartGame() {
    level = 1;
    score = 0;
    cars = [
        { x: 0, y: 60, speed: 2 },
        { x: 150, y: 150, speed: 3 },
        { x: 300, y: 240, speed: 4 },
    ];
    resetPlayer();
    isGameOver = false;
    update();
}

function update() {
    if (isGameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawCars();
    moveCars();
    checkCollision();
    checkWin();
    drawScore();
    requestAnimationFrame(update);
}

document.addEventListener('keydown', (e) => {
    if (isGameOver && e.key.toLowerCase() === 'r') {
        restartGame();
    } else if (!isGameOver) {
        switch (e.key) {
            case 'ArrowUp':
                playerY -= playerSize;
                break;
            case 'ArrowDown':
                playerY += playerSize;
                break;
            case 'ArrowLeft':
                playerX -= playerSize;
                break;
            case 'ArrowRight':
                playerX += playerSize;
                break;
        }
    }
});

update();
