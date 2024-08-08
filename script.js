const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 600;

const playerSize = 40;
let playerX = canvas.width / 2 - playerSize / 2;
let playerY = canvas.height - playerSize;

const cars = [
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
            resetPlayer();
        }
    }
}

function resetPlayer() {
    playerX = canvas.width / 2 - playerSize / 2;
    playerY = canvas.height - playerSize;
}

function checkWin() {
    if (playerY < 0) {
        alert('You win!');
        resetPlayer();
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawCars();
    moveCars();
    checkCollision();
    checkWin();
    requestAnimationFrame(update);
}

document.addEventListener('keydown', (e) => {
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
});

update();
