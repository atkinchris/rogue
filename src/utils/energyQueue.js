import Queue from './queue'

const DEFAULT_THRESHOLD = 10

class EnergyQueue extends Queue {
  constructor({ threshold = DEFAULT_THRESHOLD } = {}) {
    super()

    this.speeds = {}
    this.values = {}
    this.threshold = threshold
  }

  add(entity, { speed }) {
    this.speeds[entity] = speed
    this.values[entity] = 0
    return this.enqueue(entity)
  }

  remove(entity) {
    delete this.speeds[entity]
    delete this.values[entity]
    return this.dequeue(entity)
  }

  next() {
    while (true) {
      const entity = super.next()
      const nextValue = this.values[entity] + this.speeds[entity]

      if (nextValue >= this.threshold) {
        this.values[entity] = 0
        return entity
      }

      this.values[entity] = nextValue
    }
  }
}

export default EnergyQueue
