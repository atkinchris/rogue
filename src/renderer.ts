/* eslint-disable class-methods-use-this */
import * as PIXI from 'pixi.js'

import Entity from './types/entity'
import World from './types/world'

interface Resource {
  name: string
  spritesheet: any
  data: {
    meta: Record<string, any>
    frames: Record<
      string,
      {
        frame: {
          x: number
          y: number
          h: number
          w: number
        }
      }
    >
  }
}

const DEBUG = false
const CAMERA_SIZE = {
  WIDTH: 19,
  HEIGHT: 16,
}
const TEXT_POOL_LIMIT = CAMERA_SIZE.WIDTH * CAMERA_SIZE.HEIGHT * 2

class Renderer {
  public app: PIXI.Application
  public layers: Map<string, PIXI.Container>
  public textPool: PIXI.Text[]
  public textPoolIndex: number
  private tileSize?: number

  constructor() {
    const app = new PIXI.Application({
      width: 0,
      height: 0,
      antialias: false,
      transparent: true,
    })
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

    this.textPool = Array.from(
      { length: TEXT_POOL_LIMIT },
      () => new PIXI.Text('', { fontFamily: 'monospace', fontSize: 18, fill: 'red', align: 'center' })
    )
    this.textPoolIndex = 0
  }

  public getTextObject() {
    this.textPoolIndex = this.textPoolIndex + 1

    if (this.textPoolIndex >= TEXT_POOL_LIMIT) {
      this.textPoolIndex = 0
    }

    return this.textPool[this.textPoolIndex]
  }

  public async load() {
    return new Promise((resolve, reject) => {
      try {
        this.app.loader.use((resource: Resource, next: () => void) => {
          if (resource.name === 'spritesheet.json') {
            const {
              data: {
                meta: { tileSize, margin },
                frames,
              },
            } = resource
            this.setupView(tileSize)

            Object.values(frames).forEach(({ frame }) => {
              frame.x = frame.x * tileSize + (frame.x - 1) * margin
              frame.y = frame.y * tileSize + (frame.y - 1) * margin
              frame.w = tileSize
              frame.h = tileSize
            })

            resource.spritesheet.parse(next)
          } else {
            next()
          }
        })
        this.app.loader.add('spritesheet.json').load(resolve)
      } catch (err) {
        reject(err)
      }
    })
  }

  public render(world: World) {
    this.layers.forEach(layer => layer.removeChildren())

    const cameraX = 0
    const cameraY = 0
    const tileSize = this.tileSize!

    const entities = world.positionMap
      .getInRectangle(cameraX, cameraY, cameraX + CAMERA_SIZE.WIDTH, cameraY + CAMERA_SIZE.HEIGHT)
      .reduce((out: Entity[], { id }): Entity[] => {
        const entity = world.getEntityById(id)

        if (entity && entity.sprite) {
          out.push(entity)
        }

        return out
      }, [])

    entities.forEach(entity => {
      const {
        position: { x, y },
        sprite: { name: spriteName, frame, layer = 'background', flip },
      } = entity
      const sprite = PIXI.Sprite.from(`${spriteName}_${frame || 0}`)
      sprite.anchor.set(0.5)
      sprite.x = x * tileSize + 0.5 * tileSize
      sprite.y = y * tileSize + 0.5 * tileSize
      sprite.scale.x = flip ? -1 : 1

      if (DEBUG && frame !== undefined) {
        const textObject = this.getTextObject()
        textObject.text = `${frame}`
        sprite.addChild(textObject)
      }

      this.layers.get(layer)!.addChild(sprite)
    })

    this.app.render()
  }

  private setupView(tileSize: number) {
    this.tileSize = tileSize
    this.app.view.width = CAMERA_SIZE.WIDTH * this.tileSize
    this.app.view.height = CAMERA_SIZE.HEIGHT * this.tileSize
  }
}

export default Renderer
