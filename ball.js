class Ball {
  constructor(ctx) {
    this.ctx = ctx
    this.x = this.ctx.canvas.width / 2
    this.y = this.ctx.canvas.height / 5
    //this.r = 20
    this.w = 45
    this.h = 40

    this.vx = 0
    this.vy = 3
    this.ay = 1.5
    // this.ay = this.ay0

    this.img = new Image()
    this.img.src = "/images/balls-removebg-preview copia.png"
    this.img.frames = 4.1
    this.img.frameIndex = 0

    this.tick = 0
  }

  draw() {
    // this.ctx.beginPath()
    // this.ctx.arc(
    //   this.x,
    //   this.y,
    //   this.r,
    //   0,
    //   2 * Math.PI
    // )
    // this.ctx.fill()
    // this.ctx.closePath()

    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * this.img.width / this.img.frames,
      0,
      this.img.width / this.img.frames,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    )
  }

  move() {
    this.vy += this.ay
    this.x += this.vx
    this.y += this.vy

    if (this.vx > 0) {
      this.vx -= 0.05
    } else if (this.vx < 0) {
      this.vx += 0.05
    }
  }

  ballSpeed(num1, num2) {
    this.vx = num1

      this.vy = num2
      if (this.vy > 0) {
        this.vy -= 0.1
      } else if (this.vy < 0) {
        this.vy += 0.1
      }
  }

  goLeft(el) {
    this.vx *= -1
    this.x = el - this.w
  }

  goRight(el) {
    this.vx *= -1
    this.x = el + this.w
  }

  regularBounce(el) {
    this.vy *= -1
    this.y = el.y - this.h
  }

  inverseBounce(el) {
    this.vy *= -1
    this.y = el.y + el.h
  }

  onTop(el) {
    const colX = this.x + this.w / 2 >= el.x && this.x + this.w / 2 <= el.x + el.w
    const colY = this.y + this.h >= el.y && this.y + this.h <= el.y + el.h
    return colY && colX
  }

  underOf(el) {
    const colX = this.x + this.w / 2 >= el.x && this.x + this.w / 2 <= el.x + el.w
    const colY = this.y <= el.y + el.h && this.y >= el.y
    return colX && colY
  }

  leftCollision(el) {
    const colX = this.x <= el.x + el.w && this.x >= el.x
    const colY = this.y + this.h / 2 >= el.y && this.y + this.h <= el.y + el.h
    return colX && colY
  }
  
  rightCollision(el) {
    const colX = el.x <= this.x + this.w && el.x + el.w >= this.x + this.w
    const colY = this.y >= el.y && this.y + this.h <= el.y + el.h
    return colX && colY
  } 

  floorCollision() {
    this.vy *= -1
    this.y = this.ctx.canvas.height * 0.83 - this.h
  }

  roofCollision() {
    this.vy *= -1
    this.y = this.h
  }
}