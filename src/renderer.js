/* eslint-disable class-methods-use-this */
import * as PIXI from 'pixi.js'

class Renderer {
  constructor() {
    const app = new PIXI.Application(800, 600, { backgroundColor: 0x1099bb })
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

    const container = document.getElementById('container')
    container.appendChild(app.view)

    const world = new PIXI.Container()
    app.stage.addChild(world)

    this.app = app
    this.world = world
  }

  async load() {
    return new Promise((resolve, reject) => {
      try {
        PIXI.loader.add('assets/spritesheet.json').load(resolve)
      } catch (err) {
        reject(err)
      }
    })
  }

  render({ entities }) {
    this.world.removeChildren()

    entities.forEach(entity => {
      const sprite = PIXI.Sprite.fromFrame(`${entity.sprite}.png`)
      sprite.anchor.set(0.5)
      sprite.x = entity.x
      sprite.y = entity.y

      this.world.addChild(sprite)
    })

    this.app.render()
  }
}

export default Renderer
