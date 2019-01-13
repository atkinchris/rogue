import { v4 as uuid } from 'uuid'
import EventEmitter from 'eventemitter3'

class Entity extends EventEmitter {
  constructor({ sprite, collides, position, takesTurns }) {
    super()
    this.id = uuid()

    this.sprite = sprite
    this.collides = collides
    this.position = position
    this.takesTurns = takesTurns
  }

  moveTo(position) {
    this.position = position
    super.emit('entityMoved', this)
  }

  static Create(world, options) {
    const entity = new Entity(options)

    world.addEntity(entity)
    entity.on('entityMoved', e => world.handleEntityMoved(e))

    return entity
  }
}

export default Entity
