class Ball {
  constructor(ctx) {
    this.ctx = ctx
    this.x0 = this.ctx.canvas.width / 2
    this.x = this.x0
    this.y0 = this.ctx.canvas.height / 5
    this.y = this.y0
    this.w = 40
    this.h = 40

    this.vx = 0
    this.vy = 3
    this.ay = 1

    this.img = new Image()
    this.img.src = "images/ball-sprite.png"
    this.img.frames = 12
    this.img.frameIndex = 0

    this.bounceAudio = new Audio ('sounds/ball-vs-ground2 (mp3cut.net) (1).wav')
    this.bounceGrassAudio = new Audio ('sounds/ball-vs-grass (mp3cut.net).mp3')
    // this.bounceMetalAudio = new Audio ('sounds/metal-bar.wav')
  }

  draw() {
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

    this._animate()

  }

  move() {
    if (this.vx > 0) {
      this.vx -= 0.03
    } else if (this.vx < 0) {
      this.vx += 0.03
    }
    this.vy += this.ay
    this.x += this.vx
    this.y += this.vy


    
  }

  _animate() {
    if (Number(this.vx.toFixed(1)) > 0){
      this.img.frameIndex++
    }    
    if (Number(this.vx.toFixed(1)) < 0) {
      this.img.frameIndex--
    }
    if (Number(this.vx.toFixed(1)) === 0){
      this.img.frameIndex = 0
    }
    if (this.img.frameIndex >= this.img.frames) {
      this.img.frameIndex = 0
    }
    if (this.img.frameIndex < 0) {
      this.img.frameIndex = 12
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
    this.x = el - this.w - this.w
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
    const colY = this.y + this.h >= el.y && this.y <= el.y
    return colY && colX
  }

  underOf(el) {
    const colX = this.x + this.w / 2 >= el.x && this.x + this.w / 2 <= el.x + el.w
    const colY = this.y <= el.y + el.h && this.y >= el.y
    return colX && colY
  }

  leftCollision(el) {
    const colX = this.x <= el.x + el.w && this.x >= el.x
    const colY = this.y + this.h / 2 >= el.y && this.y + this.h / 2 <= el.y + el.h
    return colX && colY
  }

  rightCollision(el) {
    const colX = this.x + this.w >= el.x && this.x + this.w <= el.x + el.w
    const colY = this.y + this.h / 2 >= el.y && this.y + this.h / 2 <= el.y + el.h
    return colX && colY
  } 

  floorCollision() {
    this.vy *= -1
    this.y = this.ctx.canvas.height * 0.85 - this.h
  }

  roofCollision() {
    this.vy *= -1
    this.y = this.h
  }
}