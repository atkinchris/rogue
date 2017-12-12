import { posToString } from './positions'

class PositionSet {
  constructor() {
    this.items = {}
  }

  setOrGetExisting(position, value = position) {
    const existing = this.get(position)
    if (existing) return existing

    this.set(position, value)
    return this.get(position)
  }

  set(position, value = position) {
    this.items[posToString(position)] = value
  }

  get(position) {
    return this.items[posToString(position)]
  }

  has(position) {
    return !!this.get(position)
  }
}

export default PositionSet
