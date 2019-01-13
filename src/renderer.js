/* eslint-disable class-methods-use-this */
import * as PIXI from 'pixi.js'

const TILE_SIZE = 32

class Renderer {
  constructor() {
    const app = new PIXI.Application(800, 600, { backgroundColor: 0x1099bb })
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

    const container = document.getElementById('container')
    container.appendChild(app.view)

    const background = new PIXI.Container()
    const foreground = new PIXI.Container()

    app.stage.addChild(background)
    app.stage.addChild(foreground)

    this.app = app
    this.layers = {
      background,
      foreground,
    }
  }

  async load() {
    return new Promise((resolve, reject) => {
      try {
        PIXI.loader.add('spritesheet.json').load(resolve)
      } catch (err) {
        reject(err)
      }
    })
  }

  render({ components: { position } }) {
    Object.values(this.layers).forEach(layer => layer.removeChildren())

    position.forEach(entity => {
      const sprite = PIXI.Sprite.fromFrame(`${entity.sprite}_${entity.frame || 0}`)
      sprite.x = entity.x * TILE_SIZE
      sprite.y = entity.y * TILE_SIZE

      this.layers[entity.layer || 'background'].addChild(sprite)
    })

    this.app.render()
  }
}

export default Renderer
