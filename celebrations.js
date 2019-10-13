class Celebration {
  constructor(ctx) {
    this.ctx = ctx

    this.trumpDubImg = new Image()
    this.trumpDubImg.src = "images/realDub-removebg-preview.png"
    this.trumpDubImg.frames = 5
    this.trumpDubImg.frameIndex = 0

    this.trumpTick = 0

    this.putinDanceImg = new Image()
    this.putinDanceImg.src = "images/putin-dance.png"
    this.putinDanceImg.frames = 11
    this.putinDanceImg.frameIndex = 0

    this.putinTick = 0
  }

  trumpDub() {
    this.ctx.drawImage(
      this.trumpDubImg,
      this.trumpDubImg.frameIndex * this.trumpDubImg.width / this.trumpDubImg.frames,
      0,
      this.trumpDubImg.width / this.trumpDubImg.frames,
      this.trumpDubImg.height,
      400,
      300,
      200,
      200
    )
    this._trumpDubAnimate()
  }

  _trumpDubAnimate() {
    this.trumpTick++

    if (this.trumpTick > 6) {
      this.trumpTick = 0

      this.trumpDubImg.frameIndex++
    }
    if (this.trumpDubImg.frameIndex === 5) {
      this.trumpDubImg.frameIndex = 0
    }
  }

  putinDance() {
    this.ctx.drawImage(
      this.putinDanceImg,
      this.putinDanceImg.frameIndex * this.putinDanceImg.width / this.putinDanceImg.frames,
      0,
      this.putinDanceImg.width / this.putinDanceImg.frames,
      this.putinDanceImg.height,
      400,
      300,
      200,
      200
    )
    this._putinDanceAnimate()
  }

  _putinDanceAnimate() {
    this.putinTick++

    if (this.putinTick > 2) {
      this.putinTick = 0

      this.putinDanceImg.frameIndex++
    }
    if (this.putinDanceImg.frameIndex === 11) {
      this.putinDanceImg.frameIndex = 0
    }
  }
}