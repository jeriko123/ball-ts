"use strict";
console.log('start');
var app = document.getElementById("app");
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var width = (canvas.width = window.innerWidth);
var height = (canvas.height = window.innerHeight);
console.log(width);
var ballsCount = 20;
if (width < 900) {
    ballsCount = 15;
}
if (width < 450) {
    ballsCount = 10;
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var Ball = /** @class */ (function () {
    function Ball(ball) {
        this.ball = ball;
    }
    Ball.prototype.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = this.ball.color;
        ctx.arc(this.ball.x, this.ball.y, this.ball.size, 0, 2 * Math.PI);
        ctx.fill();
    };
    Ball.prototype.update = function () {
        if (this.ball.x + this.ball.size >= width) {
            this.ball.velX = -this.ball.velX;
        }
        if (this.ball.x - this.ball.size <= 0) {
            this.ball.velX = -this.ball.velX;
        }
        if (this.ball.y + this.ball.size >= height) {
            this.ball.velY = -this.ball.velY;
        }
        if (this.ball.y - this.ball.size <= 0) {
            this.ball.velY = -this.ball.velY;
        }
        this.ball.x += this.ball.velX;
        this.ball.y += this.ball.velY;
    };
    Ball.prototype.collisionDetect = function () {
        for (var j = 0; j < balls.length; j++) {
            if (!(this === balls[j])) {
                var dx = this.ball.x - balls[j].ball.x;
                var dy = this.ball.y - balls[j].ball.y;
                var distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < this.ball.size + balls[j].ball.size) {
                    if (this.ball.size > balls[j].ball.size) {
                        this.ball.velX = random(-3, 3);
                        this.ball.velY = random(-3, 3);
                    }
                    else {
                        this.ball.velX = random(-7, 7);
                        this.ball.velY = random(-7, 7);
                    }
                }
            }
        }
    };
    return Ball;
}());
var balls = [];
while (balls.length < ballsCount) {
    var size = random(10, 20);
    var ballNew = {
        x: random(0 + size, width - size),
        y: random(0 + size, height - size),
        velX: random(-7, 7),
        velY: random(-7, 7),
        color: "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")",
        size: size
    };
    var ball = new Ball(ballNew);
    balls.push(ball);
}
function loop() {
    app === null || app === void 0 ? void 0 : app.appendChild(canvas);
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, width, height);
    for (var i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }
    requestAnimationFrame(loop);
}
loop();
