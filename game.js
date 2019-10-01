class Game {
  constructor(ctx) {
  this.ctx = ctx
  
  this.footballField = new FootballField(ctx)
  this.goal2 = new Goal(ctx)
  this.intervalId = null;
  }

  run() {
    this.intervalId = setInterval( () => {
      this._clear()
      this._draw()
    }, 1000 / 60)
  }

  _clear() {
    this.ctx.clearRect(
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height
    )
  }

  _draw() {
    this.footballField.draw()
    this.goal2.draw()
  }

}