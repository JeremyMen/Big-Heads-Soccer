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

    this.goalAudio = new Audio('sounds/goal.mp3')
  }

  homeGoal(ball) {
    const colX = ball.x + ball.w / 3 >= this.x
    const colY = ball.y >= this.y
    return colX && colY
  }

  awayGoal(ball) {
    const colX = ball.x + ball.w / 2 <= this.x + this.w
    const colY = ball.y >= this.y
    return colX && colY
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
}