const player = document.getElementById('player');
const gameArea = document.getElementById('game');
const gameOverMessage = document.getElementById('game-over');
let isJumping = false;
let gameOver = false;
let obstacles = [];
let score = 0;

// Generar obstáculos
function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = '400px'; // Posición inicial
    obstacle.style.width = '30px'; // Ajuste del tamaño del obstáculo
    obstacle.style.height = '50px'; // Ajuste del tamaño del obstáculo
    gameArea.appendChild(obstacle);
    obstacles.push(obstacle);
    moveObstacle(obstacle);
}

// Mover obstáculos
function moveObstacle(obstacle) {
    let obstaclePosition = 400;
    const obstacleInterval = setInterval(() => {
        if (gameOver) {
            clearInterval(obstacleInterval);
            return;
        }
        
        if (obstaclePosition < -30) {
            clearInterval(obstacleInterval);
            gameArea.removeChild(obstacle);
            obstacles = obstacles.filter(obs => obs !== obstacle); // Eliminar de la lista
            score += 1; // Aumentar puntuación
        } else if (
            obstaclePosition > 0 && obstaclePosition < 50 && 
            parseInt(player.style.bottom) < 50
        ) {
            // Colisión
            gameOver = true;
            gameOverMessage.style.display = 'block';
            clearInterval(obstacleInterval);
        } else {
            obstaclePosition -= 5; // Ajusta la velocidad
            obstacle.style.left = obstaclePosition + 'px';
        }
    }, 20);
}

// Salto del jugador
function jump() {
    if (isJumping || gameOver) return;
    isJumping = true;
    let jumpHeight = 0;
    const jumpUp = setInterval(() => {
        if (jumpHeight >= 150) {
            clearInterval(jumpUp);
            const fallDown = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(fallDown);
                    isJumping = false;
                    player.style.bottom = '20px'; // Regresar a la posición inicial
                } else {
                    jumpHeight -= 10;
                    player.style.bottom = (20 + jumpHeight) + 'px';
                }
            }, 20);
        } else {
            jumpHeight += 10;
            player.style.bottom = (20 + jumpHeight) + 'px';
        }
    }, 20);
}

// Controles del teclado
document.addEventListener('keydown', (event) => {
    if (event.key === ' ' && !gameOver) {
        jump();
    }
});

// Generar obstáculos cada 2 segundos
const obstacleGeneration = setInterval(() => {
    if (!gameOver) {
        createObstacle();
    } else {
        clearInterval(obstacleGeneration);
    }
}, 2000);

// Reiniciar el juego
document.addEventListener('keydown', (event) => {
    if (event.key === 'r' && gameOver) {
        resetGame();
    }
});

// Reiniciar lógica del juego
function resetGame() {
    gameOver = false;
    gameOverMessage.style.display = 'none';
    obstacles.forEach(obstacle => gameArea.removeChild(obstacle));
    obstacles = [];
    score = 0;
    createObstacle();
}
 
// Iniciar el juego
createObstacle();
