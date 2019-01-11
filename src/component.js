class Component {
  constructor({ onAdd, onRemove } = {}) {
    this.storage = new Map()

    if (onAdd && typeof onAdd === 'function') {
      this.onAdd = onAdd
    }

    if (onRemove && typeof onRemove === 'function') {
      this.onRemove = onRemove
    }
  }

  add(entity, value = true) {
    if (this.onAdd) {
      this.onAdd(entity, value)
    }

    this.storage.set(entity, value)
  }

  remove(entity) {
    if (this.onAdd) {
      this.onRemove(entity)
    }

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
