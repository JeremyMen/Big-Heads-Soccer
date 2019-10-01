class Goal {
  constructor(ctx) {
    this.ctx = ctx

    this.w = 150
    this.h = 200
    this.x = 820
    this.y = 200

    this.x0 = 30
    this.y0 = 200
    

    this.img = new Image()
    this.img.src = "images/goal-right.png"

    this.img2 = new Image()
    this.img2.src = "images/goal-left.png"
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    )

    this.ctx.drawImage(
      this.img2,
      this.x0,
      this.y0,
      this.w,
      this.h
    )
  }
}