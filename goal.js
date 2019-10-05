class Goal {
  constructor(ctx, x, y, img) {
    this.ctx = ctx

    this.w = 100
    this.h = 200
    this.x = x
    this.y = y

    this.crossbar = this.y - 10
    
    this.img = new Image()
    this.img.src = img
  }

  draw() {
    this.ctx.fillRect(
      this.x,
      this.y,
      this.w,
      this.h
    )
  }

  homeGoal(ball) {
    const ColX = ball.x + ball.r >= this.x
    const ColY = ball.y >= this.y
    return ColX && ColY
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    )

  //   this.ctx.drawImage(
  //     this.img2,
  //     this.x0,
  //     this.y0,
  //     this.w,
  //     this.h
  //   )
  }
}