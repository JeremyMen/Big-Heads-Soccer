const TOP_KEY = 38
const RIGHT_KEY = 39
const LEFT_KEY = 37
const TOP_KEY_W = 87
const RIGHT_KEY_D = 68
const LEFT_KEY_A = 65

class Player {
  constructor(ctx, x, y) {
    this.ctx = ctx
    this.x = x
    this.y0 = y
    this.y = this.y0
    this.w = 50
    this.h = 80

    this.vx = 0
    this.vy = 0
    this.ay = 0.9

    // this.img = new Image()
    // this.img.src = "#img"
  }

  draw() {
    this.ctx.fillRect(
      this.x,
      this.y,
      this.w,
      this.h
    )
  }

  move() {
    this.x += this.vx

    if (this.y < this.y0) {
      this.vy += this.ay;
      this.y += this.vy;
    } else {
      this.vy = 0;
      this.y = this.y0
    }
  }

  header(ball) {
    ball.vy -= 2
  }

  _jump() {
    if (!this._isJumping()){
      this.y -= 1;
      this.vy -= 15;
    }
  }

  _isJumping(){
    return (this.y < this.y0)
  }
}