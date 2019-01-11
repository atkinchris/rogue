class Component {
  constructor() {
    this.storage = new Map()
  }

  add(entity, value = true) {
    this.storage.set(entity, value)
  }

  remove(entity) {
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
