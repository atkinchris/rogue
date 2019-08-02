import EventEmitter from 'eventemitter3'
import { v4 as uuid } from 'uuid'

import Position from './position'
import Sprite from './sprite'
import World from './world'

export interface EntityOptions {
  sprite: Sprite
  collides?: boolean
  position: Position
  takesTurns?: TakesTurns
  isDoor?: boolean
}

interface TakesTurns {
  speed: number
  behaviour: string
}

class Entity extends EventEmitter {
  public static create(world: World, options: EntityOptions) {
    const entity = new Entity(options)

    world.addEntity(entity)
    entity.on('entityMoved', e => world.handleEntityMoved(e))

    return entity
  }
  public id: string

  public sprite: Sprite
  public collides: boolean
  public position: Position
  public takesTurns?: TakesTurns
  public isDoor?: boolean

  constructor({ sprite, collides, position, takesTurns, isDoor }: EntityOptions) {
    super()
    this.id = uuid()

    this.sprite = sprite
    this.collides = collides || false
    this.position = position
    this.takesTurns = takesTurns
    this.isDoor = isDoor
  }

  public moveTo(position: Position) {
    if (this.position.x < position.x) {
      this.sprite.flip = false
    }

    if (this.position.x > position.x) {
      this.sprite.flip = true
    }

    this.position = position

    super.emit('entityMoved', this)
  }
}

export default Entity
