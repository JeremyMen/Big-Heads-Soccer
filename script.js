const canvas = document.getElementById("my-canvas")
const ctx = canvas.getContext("2d")
const width = canvas.getAttribute('width')
const height = canvas.getAttribute('height')
const mainGame = document.getElementById('main-game')

const TOP_KEY = 38
const RIGHT_KEY = 39
const LEFT_KEY = 37
const TOP_KEY_W = 87
const RIGHT_KEY_D = 68
const LEFT_KEY_A = 65
const NEW_GAME = 78

const startButton = document.getElementById('start-game-btn')
const startPage = document.getElementById('start-page')
const startAudio = new Audio('sounds/uefa-champions-league-leagu.mp3')
const refereeStart = new Audio('sounds/referee-start.mp3')

const game = new Game(ctx)


document.onkeydown = (e) => {
    if (e.keyCode === TOP_KEY) {
      game.p2.jump()
    } else if (e.keyCode === RIGHT_KEY) {
      game.p2.vx = 3
    } else if (e.keyCode === LEFT_KEY) {
      game.p2.vx = - 3
    } else if (e.keyCode === TOP_KEY_W) {
      game.p1.jump()
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

if (startPage.getAttribute('class') !== 'hide') {
  startAudio.play()
}

startButton.onclick = () => {
  startAudio.pause()
  refereeStart.play()
  mainGame.setAttribute('class', "")
  startPage.setAttribute('class', 'hide')
  game.run()
}


