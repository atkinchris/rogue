/* eslint-disable class-methods-use-this */
import * as PIXI from 'pixi.js'

import World from './types/world'
import Entity from './types/entity'

const TILE_SIZE = 32

class Renderer {
  app: PIXI.Application
  layers: Map<string, PIXI.Container>

  constructor() {
    const app = new PIXI.Application(800, 600, { backgroundColor: 0x1099bb })
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

    const container = document.getElementById('container')

    if (container) {
      container.appendChild(app.view)
    }

    const background = new PIXI.Container()
    const foreground = new PIXI.Container()

    app.stage.addChild(background)
    app.stage.addChild(foreground)

    this.app = app
    this.layers = new Map()
    this.layers.set('background', background)
    this.layers.set('foreground', foreground)
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

  render(world: World) {
    this.layers.forEach(layer => layer.removeChildren())

    const entities = world.positionMap.getInRectangle(0, 0, 20, 16).reduce((out: Entity[], { id }): Entity[] => {
      const entity = world.getEntityById(id)

      if (entity && entity.sprite) {
        out.push(entity)
      }

      return out
    }, [])

    entities.forEach(entity => {
      const {
        position: { x, y },
        sprite: { name: spriteName, frame = 0, layer = 'background' },
      } = entity
      const sprite = PIXI.Sprite.fromFrame(`${spriteName}_${frame}`)
      sprite.x = x * TILE_SIZE
      sprite.y = y * TILE_SIZE

      this.layers.get(layer)!.addChild(sprite)
    })

    this.app.render()
  }
}

export default Renderer
