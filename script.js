const canvas = document.getElementById("my-canvas")
const ctx = canvas.getContext("2d")


const game = new Game(ctx)

document.onkeydown = (e) => {
    if (e.keyCode === TOP_KEY) {
      game.p2._jump()
    } else if (e.keyCode === RIGHT_KEY) {
      game.p2.vx = 3
    } else if (e.keyCode === LEFT_KEY) {
      game.p2.vx = - 3
    } else if (e.keyCode === TOP_KEY_W) {
      game.p1._jump()
    } else if (e.keyCode === RIGHT_KEY_D) {
      game.p1.vx = 3
    } else if (e.keyCode === LEFT_KEY_A) {
      game.p1.vx = -3
    }
  }

  document.onkeyup = (e) => {
    if (e.keyCode === RIGHT_KEY) {
      game.p2.vx = 0
    } else if (e.keyCode === LEFT_KEY) {
      game.p2.vx = 0
    } else if (e.keyCode === RIGHT_KEY_D) {
      game.p1.vx = 0
    } else if (e.keyCode === LEFT_KEY_A) {
      game.p1.vx = 0
    }
  }

game.run()