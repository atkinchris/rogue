import { v4 as uuid } from 'uuid'
import EventEmitter from 'eventemitter3'

import Position from './position'
import Sprite from './sprite'
import World from './world'

export interface EntityOptions {
  sprite: Sprite
  collides?: boolean
  position: Position
  takesTurns?: TakesTurns
}

interface TakesTurns {
  speed: number
  behaviour: string
}

class Entity extends EventEmitter {
  id: string

  sprite: Sprite
  collides: boolean
  position: Position
  takesTurns?: TakesTurns

  constructor({ sprite, collides, position, takesTurns }: EntityOptions) {
    super()
    this.id = uuid()

    this.sprite = sprite
    this.collides = collides || false
    this.position = position
    this.takesTurns = takesTurns
  }

  moveTo(position: Position) {
    this.position = position
    super.emit('entityMoved', this)
  }

  setFrame(frame: number) {
    this.sprite.frame = frame
  }

  static Create(world: World, options: EntityOptions) {
    const entity = new Entity(options)

    world.addEntity(entity)
    entity.on('entityMoved', e => world.handleEntityMoved(e))

    return entity
  }
}

export default Entity
