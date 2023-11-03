var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var circle = function (x, y, radius, fillTrue) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, fillTrue);
  if (fillTrue) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
};
var blockSize = 10;
var widthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;
var score = 0;
var drawScore = function (color) {
  ctx.font = "22px Arial";
  ctx.fillStyle = color;
  ctx.textBaseline = "top";
  ctx.fillText("Score: " + score, blockSize, blockSize);
};

var gameOver = function (color) {
  ctx.font = "52px Arial";
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", width / 2, height / 2);
};

var gameBorder = function (color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, blockSize);
  ctx.fillRect(0, height - blockSize, width, blockSize);
  ctx.fillRect(0, 0, blockSize, height);
  ctx.fillRect(width - blockSize, 0, width, height);
};
var Block = function (x, y) {
  this.col = x;
  this.row = y;
};
Block.prototype.drawSquare = function (color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(
    this.col * blockSize,
    this.row * blockSize,
    blockSize,
    blockSize
  );
};
Block.prototype.drawCircle = function (color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  circle(this.col * blockSize, this.row * blockSize, blockSize / 2, true);
};
Block.prototype.equal = function (otherElement) {
  return this.col === otherElement.col && this.row === otherElement.row;
};
var Snake = function () {
  this.segments = [new Block(7, 5), new Block(6, 5), new Block(5, 5)];
  this.direction = "right";
  this.nextDirection = "right";
};
Snake.prototype.draw = function () {
  for (var z = 0; z < this.segments.length; z++) {
    this.segments[z].drawSquare("green");
  }
};
Snake.prototype.move = function () {
  var head = this.segments[0];
  var newHead;
  this.direction = this.nextDirection;
  if (this.direction === "right") {
    newHead = new Block(head.col + 1, head.row);
  } else if (this.direction === "left") {
    newHead = new Block(head.col - 1, head.row);
  } else if (this.direction === "down") {
    newHead = new Block(head.col, head.row + 1);
  } else if (this.direction === "up") {
    newHead = new Block(head.col, head.row - 1);
  }
  if (this.checkCollision(head)) {
    gameOver();
    return;
  }
  this.segments.unshift(newHead);
  if (head.equal(apple.position)) {
    score++;
    apple.move();
  } else {
    this.segments.pop();
  }
};
Snake.prototype.checkCollision = function (head) {
  var leftCollision = head.col === 0;
  var rightCollision = head.col === widthInBlocks - 1;
  var topCollision = head.row === 0;
  var downCollision = head.row === heightInBlocks - 1;
  var wallCollision =
    leftCollision || rightCollision || topCollision || downCollision;
  var selfCollision = false;
  for (var x = 0; x < this.segments.length; x++) {
    if (head.equal(this.segments[x])) {
      selfCollision = true;
    }
  }
  return wallCollision;
};
