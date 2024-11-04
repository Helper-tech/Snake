const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const gridSize = 20;
const canvasSize = 400;
canvas.width = canvasSize;
canvas.height = canvasSize;

// Snake properties
let snake = [{ x: 10, y: 10 }];
let direction = 'right';
let food = {};
let score = 0;

// Generate initial food
function generateFood() {
  food = {
    x: Math.floor(Math.random() * (canvasSize / gridSize)),
    y: Math.floor(Math.random() * (canvasSize / gridSize)),
  };
}

// Draw the snake
function drawSnake() {
  ctx.fillStyle = 'green';
  snake.forEach((segment, index) => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    if (index === 0) {
      ctx.fillStyle = 'darkgreen';
      ctx.fillRect(segment.x * gridSize + 2, segment.y * gridSize + 2, gridSize - 4, gridSize - 4);
    }
  });
}

// Draw the food
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Update the snake's position
function update() {
  // Move the snake's body
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i] = { ...snake[i - 1] };
  }

  // Move the snake's head
  switch (direction) {
    case 'up':
      snake[0].y--;
      break;
    case 'down':
      snake[0].y++;
      break;
    case 'left':
      snake[0].x--;
      break;
    case 'right':
      snake[0].x++;
      break;
  }

  // Check for collisions
  if (
    snake[0].x < 0 ||
    snake[0].x >= canvasSize / gridSize ||
    snake[0].y < 0 ||
    snake[0].y >= canvasSize / gridSize ||
    checkCollision()
  ) {
    gameOver();
  }

  // Eat the food
  if (snake[0].x === food.x && snake[0].y === food.y) {
    score++;
    generateFood();
    snake.push({ ...snake[snake.length - 1] });
  }

  // Clear the canvas
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  // Draw the game elements
  drawSnake();
  drawFood();

  // Update the score
  ctx.fillStyle = 'black';
  ctx.font = '16px Arial';
  ctx.fillText(`Score: ${score}`, 10, 20);
}

// Check for collision with the snake's body
function checkCollision() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      return true;
    }
  }
  return false;
}

// Game over function
function gameOver() {
  clearInterval(gameLoop);
  alert('Game Over! Your score: ' + score);
}

// Handle keyboard input
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (direction !== 'down') direction = 'up';
      break;
    case 'ArrowDown':
      if (direction !== 'up') direction = 'down';
      break;
    case 'ArrowLeft':
      if (direction !== 'right') direction = 'left';
      break;
    case 'ArrowRight':
      if (direction !== 'left') direction = 'right';
      break;
  }
});

// Start the game loop
generateFood();
let gameLoop = setInterval(update, 100);
