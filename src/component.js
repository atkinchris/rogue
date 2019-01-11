import EventEmitter from 'eventemitter3'

class Component extends EventEmitter {
  constructor() {
    super()
    this.storage = new Map()
  }

  add(entity, value = true) {
    super.emit('added', entity, value)
    this.storage.set(entity, value)
  }

  remove(entity) {
    super.emit('removed', entity)
    this.storage.delete(entity)
  }

  has(entity) {
    return this.storage.has(entity)
  }

  get(entity) {
    return this.storage.get(entity)
  }

  forEach(fn) {
    this.storage.forEach(fn)
  }
}

export default Component
