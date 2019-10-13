class FootballField {
  constructor(ctx){
    this.ctx = ctx
    this.w = this.ctx.canvas.width
    this.h = this.ctx.canvas.height
    this.x = 0
    this.y = 0

    this.img = new Image()
    this.img.src = "images/football-field2.jpg"
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

  rightWall(el) {
    return el.x + el.w + el.w >= this.ctx.canvas.width
  }
  
  leftWall(el) {
    return el.x - el.w <= 0 
  }

  isRoof(el) {
    return el.y <= 0 
  }

  isFloor(el) {
    return el.y + el.h >= this.ctx.canvas.height * 0.85
  }
}