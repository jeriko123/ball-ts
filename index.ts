console.log('start')
const app = document.getElementById("app");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d")!;
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface BallValue {
    x: number;
    y: number;
    velX: number;
    velY: number;
    color: string;
    size: number;
}

class Ball {
    ball: BallValue;
    constructor(ball: BallValue) {
        this.ball = ball
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.ball.color;
        ctx.arc(this.ball.x, this.ball.y, this.ball.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
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
    }


    collisionDetect() {
        for (var j = 0; j < balls.length; j++) {
            if (!(this === balls[j])) {
                var dx = this.ball.x - balls[j].ball.x;
                var dy = this.ball.y - balls[j].ball.y;
                var distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.ball.size + balls[j].ball.size) {
                    // balls[j].ball.color = `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
                    // this.ball.color = `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;

                    balls[j].ball.velX = -balls[j].ball.velX;
                    balls[j].ball.velY = -balls[j].ball.velY;

                    this.ball.velX = -this.ball.velX;
                    this.ball.velY = -this.ball.velY;

                }
            }
        }
    }

}

let balls: Array<Ball> = [];


while (balls.length < 25) {
    let size = random(10, 20)
    let ballNew = {
        x: random(0 + size, width - size),
        y: random(0 + size, height - size),
        velX: random(-7, 7),
        velY: random(-7, 7),
        color: `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`,
        size: size
    }
    let ball = new Ball(ballNew);
    balls.push(ball);
}


function loop() {
    app?.appendChild(canvas);
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    requestAnimationFrame(loop);
}

loop();