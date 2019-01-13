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

  render(world) {
    Object.values(this.layers).forEach(layer => layer.removeChildren())

    const entities = world
      .getResource('positionMap')
      .search({
        minX: 0,
        minY: 0,
        maxX: 20,
        maxY: 16,
      })
      .map(({ id }) => world.getEntityById(id))
      .filter(entity => !!entity.sprite)

    entities.forEach(({ position: { x, y }, sprite: { name: spriteName, frame = 0, layer = 'background' } }) => {
      const sprite = PIXI.Sprite.fromFrame(`${spriteName}_${frame}`)
      sprite.x = x * TILE_SIZE
      sprite.y = y * TILE_SIZE

      this.layers[layer].addChild(sprite)
    })

    this.app.render()
  }
}

export default Renderer
