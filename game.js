class Game {
  constructor(ctx) {
  this.ctx = ctx
  
  this.footballField = new FootballField(ctx)

  this.p1 = new Player(
    ctx,
    ctx.canvas.width * 0.3,
    ctx.canvas.height * 0.65,
    "images/trump.png"
  )

  this.p2 = new Player(
    ctx,
    ctx.canvas.width - (ctx.canvas.width * 0.3) - 50,
    ctx.canvas.height * 0.65,
    "images/putin.png"
  )

  this.goal1 = new Goal(
    ctx,
    ctx.canvas.width * 0.01,
    ctx.canvas.height * 0.5,
    "images/left-goal.png"
  )

  this.goal2 = new Goal(
    ctx,
    ctx.canvas.width - 100 - (ctx.canvas.width * 0.01),
    ctx.canvas.height * 0.5,
    "images/right-goal.png"
  )

  this.ball = new Ball(ctx)

  this.celebrations = new Celebration(ctx)

  this.intervalId = null;

  this.homeScore0 = 0
  this.homeScore = this.homeScore0
  this.awayScore0 = 0
  this.awayScore = this.awayScore0

  this.pause = false
  this.pauseP1 = false
  this.pauseP2 = false

  this.bombs = [
    new FootballBomb(ctx)
  ]

  this.tickBomb = 0

  this.refereeStart = new Audio('sounds/referee-start.mp3')

  this.refereeEnd = new Audio('sounds/referee-end.wav')

  this.mainAudio = new Audio("sounds/main-audio.mp3")
  this.mainAudio.loop = true;

  }

  run() {
    this.mainAudio.play()

    this.intervalId = setInterval( () => {
      this._draw()
      if(!this.pause){
        this._move()
      }
      if (this.pause && this.homeScore > this.homeScore0 && this.homeScore !== 3) {
        this.printGoal()
        this.celebrations.trumpDub()
      } else if (this.pause && this.awayScore > this.awayScore0 && this.awayScore !== 3) {
        this.printGoal()
        this.celebrations.putinDance()
      }
      this._clearBombs()
      this.bombCollisions()
      this._ballAgainstWalls()
      this._ballAgainstPlayers()
      this._ballAgainstGoals()
      this._isGoal()
    }, 1000 / 60)
  }

  _draw() {
    this.footballField.draw()
    this.tickBomb ++
    if (this.tickBomb > Math.random() * 500000) {
      this.tick = 0
      this._addBomb()
    }
    this.p1.draw()
    this.p2.draw()
    this.ball.draw()
    this.goal1.draw()
    this.goal2.draw()
    this.bombs.forEach(b => b.draw())
    this._printScore()
  }

  _move() {
    if (!this.pauseP1) {
      this.p1.move()
    }
    if (!this.pauseP2){
      this.p2.move()
    }
    this.ball.move()
    this.bombs.forEach(b => b.move())
  }

  printGoal() {
    this.ctx.font = "100px Impact"
    this.ctx.textAlign = "center"
    this.ctx.fillText(
      `GOAL!`,
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    )
  }

  _printScore() {
    this.ctx.font = "60px Impact"
    this.ctx.textAlign = "center"
    this.ctx.fillText(
      `${this.homeScore}   -   ${this.awayScore}`,
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height * 0.1
    )
    if(this.homeScore === 3 || this.awayScore === 3) {
      this._gameOver()
    }
  }

  _addBomb() {
    this.bombs.push(
      new FootballBomb(this.ctx)
    )
  }

  _clearBombs() {
    this.bombs = this.bombs.filter(b => {
      return b.y + b.h <= this.ctx.canvas.height * 0.85
    })
  }

  _freezy(redImg, img, player) {
    player.img.src = redImg
      player === this.p1 ? this.pauseP1 = true : this.pauseP2 = true
      setTimeout(() => {
        player.img.src = img
        player === this.p1 ? this.pauseP1 = false : this.pauseP2 = false
      }, 2500);
  }

  _bombAgainstPlayers(player) {
    const colP = this.bombs.some(b =>{
      let col = b.collide(player)
      if (col) {
        b.explosionAudio.play()
        b.y = 600
      }
      return col
    })
    return colP
  }

  bombCollisions() {
    const colP1 = this._bombAgainstPlayers(this.p1)
    const colP2 = this._bombAgainstPlayers(this.p2)

    if (colP1) {
      this._freezy("images/red-trump.png", "images/trump.png", this.p1)
    }  

    if (colP2) {
      this._freezy("images/red-putin.png", "images/putin.png", this.p2)
    }
  }

  _ballAgainstWalls() {
    if (this.footballField.rightWall(this.ball)) {
      this.ball.goLeft(this.ctx.canvas.width)
      this.ball.bounceGrassAudio.play()
    } else if (this.footballField.leftWall(this.ball)) {
      this.ball.goRight(0)
      this.ball.bounceGrassAudio.play()
    }else if (this.footballField.isFloor(this.ball)) {
      this.ball.floorCollision()
      this.ball.bounceGrassAudio.play()
    }else if (this.footballField.isRoof(this.ball)) {
       this.ball.roofCollision()
     }
  }

  _ballAgainstPlayers() {
    if (this.ball.onTop(this.p1)) {
      this.ball.bounceAudio.play()
      this.ball.regularBounce(this.p1)
      this.p1.header(this.ball)
    }else if (this.ball.onTop(this.p2)) {
      this.ball.bounceAudio.play()
      this.ball.regularBounce(this.p2)
      this.p2.header(this.ball)
    }
    if(this.ball.underOf(this.p1)){
      this.ball.bounceAudio.play()
      this.ball.inverseBounce(this.p1)
    }
    if(this.ball.underOf(this.p1) && this.footballField.isFloor(this.ball)) {
      this.ball.bounceAudio.pause()
      this.p1.overTheBall(this.ball)
    }
    if(this.ball.underOf(this.p2)) {
      this.ball.bounceAudio.play()
      this.ball.inverseBounce(this.p2)
    }
    if(this.ball.underOf(this.p2) && this.footballField.isFloor(this.ball)) {
      this.ball.bounceAudio.pause()
      this.p2.overTheBall(this.ball)
    }
    if (this.ball.leftCollision(this.p1) || this.ball.leftCollision(this.p2)) {
      this.ball.bounceAudio.play()
      this.ball.ballSpeed(7, 13)
    }else if (this.ball.rightCollision(this.p1) || this.ball.rightCollision(this.p2)) {
      this.ball.bounceAudio.play()
      this.ball.ballSpeed(-7, -13)
    }
  }

  _ballAgainstGoals() {
    if (this.ball.underOf(this.goal2)){
      this.ball.vx -= 0.06
    }else if (this.ball.onTop(this.goal2)) {
      // this.ball.bounceMetalAudio.play()
      this.ball.regularBounce(this.goal2)
      this.ball.vx -= 1
    }else if (this.ball.underOf(this.goal1)){
      this.ball.vx += 0.06
    }else if (this.ball.onTop(this.goal1)) {
      // this.ball.bounceMetalAudio.play()
      this.ball.regularBounce(this.goal1)
      this.ball.vx += 1
    }
  }

  _isGoal() {
    if(this.goal2.homeGoal(this.ball)) {
      this.goal2.goalAudio.play()
      this.homeScore ++
      this.restartGame()
    } else if (this.goal1.awayGoal(this.ball)) {
      this.goal1.goalAudio.play()
      this.awayScore ++
      this.restartGame()
    }
  }
  restartGame() {
    this.pause = true
      setTimeout(() => {
        this.homeScore === 3 || this.awayScore === 3 ? this.refereeStart.pause() : 
          this.refereeStart.play()
        this.pause = false
        this.homeScore0 = this.homeScore
        this.awayScore0 = this.awayScore
      }, 3500);
    this.bombs = []
    this.ball.x = this.ball.x0
    this.ball.y = this.ball.y0
    this.p1.x = this.p1.x0
    this.p1.y = this.p1.y0
    this.p2.x = this.p2.x0
    this.p2.y = this.p2.y0
    this.ball.vx = 0  
  }
  
  _gameOver() {
    this.mainAudio.pause()
    clearInterval(this.intervalId)
    this.refereeEnd.play()
    this.ctx.font = "40px Impact";
    this.ctx.textAlign = "center";
    if(this.homeScore > this.awayScore){
      this.ctx.fillText(
        `TRUMP WINS THE WAR! ...EHM, THE MATCH!`,
        this.ctx.canvas.width / 2,
        this.ctx.canvas.height / 2
      ) 
    } else {
      this.ctx.fillText(
        `PUTIN WINS THE WAR! ...EHM, THE MATCH!`,
        this.ctx.canvas.width / 2,
        this.ctx.canvas.height / 2
      )
    }
  }
  
}