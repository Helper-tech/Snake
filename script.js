const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 10;
const snakeColor = 'green';
const foodColor = 'red';
const backgroundColor = '#000';

let snake = [{ x: 10, y: 10 }];
let food = {};
let direction = 'RIGHT';
let score = 0;
let gameOver = false;

function generateFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
    y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
  };
}

function drawSnake() {
  ctx.fillStyle = snakeColor;
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });
}

function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function moveSnake() {
  const head = { x: snake[0].x, y: snake[0].y };

  if (direction === 'RIGHT') {
    head.x += gridSize;
  } else if (direction === 'LEFT') {
    head.x -= gridSize;
  } else if (direction === 'UP') {
    head.y -= gridSize;
  } else if (direction === 'DOWN') {
    head.y += gridSize;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    generateFood();
  } else {
    snake.pop();
  }
}

function checkCollision() {
  // Check if the snake hits itself
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === s
