const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const gameOverMessage = document.getElementById('game-over');
let isJumping = false;
let gameOver = false;

// Mover el obstáculo
function moveObstacle() {
    let obstaclePosition = 400;
    const obstacleInterval = setInterval(() => {
        if (obstaclePosition < -50) {
            clearInterval(obstacleInterval);
            obstaclePosition = 400;
        } else if (obstaclePosition > 0 && obstaclePosition < 50 && !isJumping) {
            // Colisión
            gameOverMessage.style.display = 'block';
            gameOver = true;
            clearInterval(obstacleInterval);
        } else {
            obstaclePosition -= 10;
            obstacle.style.left = obstaclePosition + 'px';
        }
    }, 20);
}

// Salto del jugador
function jump() {
    if (isJumping || gameOver) return;
    isJumping = true;
    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
        if (jumpHeight >= 150) {
            clearInterval(jumpInterval);
            const fallInterval = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(fallInterval);
                    isJumping = false;
                } else {
                    jumpHeight -= 10;
                    player.style.bottom = jumpHeight + 'px';
                }
            }, 20);
        } else {
            jumpHeight += 10;
            player.style.bottom = jumpHeight + 'px';
        }
    }, 20);
}

// Controles del teclado
document.addEventListener('keydown', (event) => {
    if (event.key === ' ' && !gameOver) {
        jump();
    }
});

// Iniciar el juego
moveObstacle();
