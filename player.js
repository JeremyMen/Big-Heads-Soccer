class Player {
  constructor(ctx, x, y, img) {
    this.ctx = ctx

    this.x0 = x
    this.x = this.x0
    this.y0 = y
    this.y = this.y0
    this.w = 100
    this.h = 120

    this.vx = 0
    this.vy = 0
    this.ay = 0.9

    this.img = new Image()
    this.img.src = img
  }

  draw() {
    this.ctx.drawImage(
      this.img,
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
    this.leftLimit()
    this.rightLimit()
  }

  leftLimit() {
    if (this.x <= 0) {
      this.x = 0
    }
  }
  
  rightLimit() {
    if (this.x + this.w >= this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width - this.w
    }
  }

  header(ball) {
    ball.vy -= 2
  }

  jump() {
    if (!this._isJumping()){
      this.y -= 1;
      this.vy -= 15;
    }
  }

  _isJumping(){
    return (this.y < this.y0)
  }

  overTheBall(el) {
    el.vy = 0
    el.vx = 0
    el.y = ctx.canvas.height * 0.85 - el.h
    this.y = ctx.canvas.height * 0.85 - el.h - this.h
  }
}