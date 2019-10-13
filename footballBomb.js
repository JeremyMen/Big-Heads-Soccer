class FootballBomb {
  constructor(ctx) {
    this.ctx = ctx
    this.x = Math.random() * (ctx.canvas.width - (ctx.canvas.width * 
      0.1) - ctx.canvas.width * 0.1) + ctx.canvas.width * 0.1
    this.y = 0
    this.w = 60
    this.h = 60
    this.vy = 2

    this.img = new Image()
    this.img.src = "images/football-bomb.png"

    this.explosionAudio = new Audio('sounds/explosion.mp3')
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
    this.y += this.vy
  }

  collide(el) {
    const colX = el.x + el.w > this.x && el.x < this.x + this.w
    const colY = el.y + el.h > this.y && el.y < this.y + this.h

    return colX && colY
  }
}