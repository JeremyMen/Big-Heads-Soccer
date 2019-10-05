class Game {
  constructor(ctx) {
  this.ctx = ctx
  
  this.footballField = new FootballField(ctx)

  this.p1 = new Player(
    ctx,
    ctx.canvas.width * 0.3,
    ctx.canvas.height * 0.7
  )

  this.p2 = new Player(
    ctx,
    ctx.canvas.width - (ctx.canvas.width * 0.3) - 50,
    ctx.canvas.height * 0.7
  )

  this.goal1 = new Goal(
    ctx,
    ctx.canvas.width * 0.01,
    ctx.canvas.height * 0.5,
    "/images/left-goal.png"
  )

  this.goal2 = new Goal(
    ctx,
    ctx.canvas.width - 100 - (ctx.canvas.width * 0.01),
    ctx.canvas.height * 0.5,
    "/images/right-goal.png"
  )

  this.ball = new Ball(ctx)

  this.intervalId = null;

  this.homeScore = 0
  this.awayScore = 0
  }

  run() {
    this.intervalId = setInterval( () => {
      this._draw()
      this._move()
      this._ballAgainstWalls()
      this._ballAgainstPlayers()
      //this._ballAgainstGoals()
      this.isGoal()
    }, 1000 / 60)
  }

  _draw() {
    this.footballField.draw()
    this.goal1.draw()
    this.goal2.draw()
    this.p1.draw()
    this.p2.draw()
    this.ball.draw()
    this._score()
  }

  _score() {
    this.ctx.font = "60px Impact"
    this.ctx.textAlign = "center"
    this.ctx.fillText(
      `${this.homeScore}   -   ${this.awayScore}`,
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height * 0.1
    )
  }

  _move() {
    this.p1.move()
    this.p2.move()
    this.ball.move()
  }

  _ballAgainstWalls() {
    if (this.footballField.rightWall(this.ball)) {
      this.ball.goLeft(this.ctx.canvas.width)
    }
    if (this.footballField.leftWall(this.ball)) {
      this.ball.goRight(0)
    }
    if (this.footballField.isFloor(this.ball)) {
      this.ball.floorCollision()
    }

     if (this.footballField.isRoof(this.ball)) {
       this.ball.roofCollision()
     }
  }

  _ballAgainstPlayers() {
    if (this.ball.onTop(this.p1)) {
      this.ball.regularBounce(this.p1)
      this.p1.header(this.ball)
    }
    if (this.ball.onTop(this.p2)) {
      this.ball.regularBounce(this.p2)
      this.p2.header(this.ball)
    } 
    if(this.ball.underOf(this.p1)){
      console.log('ciao')
      this.ball.inverseBounce(this.p1)
    }
    if(this.ball.underOf(this.p2)) {
      this.ball.inverseBounce(this.p2)
    }
    if (this.ball.leftCollision(this.p1) || this.ball.leftCollision(this.p2)) {
      this.ball.ballSpeed(5, 20)
    }

    if (this.ball.rightCollision(this.p1) || this.ball.rightCollision(this.p2)) {
      this.ball.ballSpeed(-5, -20)
    }
  }

  // _ballAgainstGoals() {
  //   // if (this.ball.underOf(this.goal2)){
  //   //   this.ball.inverseBounce(this.goal2)
  //   // } 
  //   if (this.ball.onTop(this.goal2)) {
  //     this.ball.regularBounce(this.goal2)
  //   }
  //   // if (this.ball.underOf(this.goal1)){
  //   //   this.ball.inverseBounce(this.goal1)
  //   // } 
  //   if (this.ball.onTop(this.goal1)) {
  //     this.ball.regularBounce(this.goal1)
  //   }
  // }

    

  isGoal() {
    if (this.goal2.homeGoal(this.ball)) {
      console.log('ciao')
      this.homeScore++
    }
  }
}