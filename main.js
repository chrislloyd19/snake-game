var newApple = function() {
  var x = Math.floor(Math.random() * (GRID_SIZE - 0));
  var y = Math.floor(Math.random() * (GRID_SIZE - 0));

  return {x: x, y: y};
}

var bigSnake = function() {
  var snake = [];
  for(var i = 3; i < 17; i++) {
    snake.push({x: i, y: 13});
  }
  return snake;
}

const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
const UP = 'UP';
const DOWN =  'DOWN';

const HEIGHT = 500;
const WIDTH = 500;

const GRID_SIZE = 20;

snake = [{x: 12, y: 13}];
//snake = bigSnake();
apple = newApple();
direction = DOWN;

var keyPush = function(event) {

  switch(event.keyCode) {
    case 37:
      if(direction != RIGHT)
        direction = LEFT;
      break;
    case 38:
      if(direction != DOWN)
        direction = UP;
      break;
    case 39:
      if(direction != LEFT)
        direction = RIGHT;
      break;
    case 40:
      if(direction != UP)
        direction = DOWN;
      break;
  }

}

// main game loop
// draws grid, apple, snake
// updates the snake
var game = function() {

  drawGrid();
  drawApple();
  drawSnake();

  if(eatApple()) {
    snake.unshift(newHead());
    apple = newApple();
    drawApple();
  }

  snake.unshift(newHead());
  snake.pop();

  collisionDetection();

}

var eatApple = function() {
  return snake[0].x == apple.x && snake[0].y == apple.y
}

var drawSnake = function() {
  for(var i = 0; i < snake.length; i++) {
    ctx.fillStyle = 'green';
    ctx.fillRect(snake[i].x * GRID_SIZE, snake[i].y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
  }
}

var drawApple = function() {
  ctx.fillStyle = 'red';
  ctx.fillRect(apple.x * GRID_SIZE, apple.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
}

var drawGrid = function() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,canvas.width,canvas.height);

  for(var i = GRID_SIZE; i < WIDTH; i+= GRID_SIZE) {
    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 500);
    ctx.stroke();
    ctx.closePath();
  }

  for(var i = GRID_SIZE; i < HEIGHT; i+= GRID_SIZE) {
    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(500, i);
    ctx.stroke();
    ctx.closePath();
  }

}

// returns a new head object based on current position
var newHead = function() {
  var newHead = {x: 0, y: 0};

  if(direction == RIGHT) {
    newHead.x = snake[0].x + 1;
    newHead.y = snake[0].y;
  }

  if(direction == LEFT) {
    newHead.x = snake[0].x - 1;
    newHead.y = snake[0].y;
  }

  if(direction == UP) {
    newHead.x = snake[0].x;
    newHead.y = snake[0].y - 1;
  }

  if(direction == DOWN) {
    newHead.x = snake[0].x;
    newHead.y = snake[0].y + 1;
  }

  return newHead;
}

// detects snake collision with border and itself
// restarts game if detected
var collisionDetection = function() {

  if(snake[0].x > 25) {
    restart();
  }

  if(snake[0].y > 25) {
    restart();
  }

  if(snake[0].x < 0) {
    restart();
  }

  if(snake[0].y < 0) {
    restart();
  }

 snake.slice(1,snake.length).forEach(function(piece) {
    if(snake[0].x == piece.x && snake[0].y == piece.y) {
      restart();
    }
  });
}

// restarts the game
var restart = function() {
  snake = [{x: 12, y: 13}];
  direction = DOWN;
  apple = newApple();
}

// setup canvas object, keypress event listener, game loop
window.onload = function() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  document.addEventListener('keydown', keyPush);
  setInterval(game, 1000/15);
}
