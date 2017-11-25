import Queue from './queue'

const DEFAULT_THRESHOLD = 10

class EnergyQueue extends Queue {
  constructor({ threshold = DEFAULT_THRESHOLD } = {}) {
    super()

    this.speeds = {}
    this.values = {}
    this.threshold = threshold
  }

  add(entity, { speed = 1 }) {
    this.speeds[entity] = speed
    this.values[entity] = 0
    return this.enqueue(entity)
  }

  remove(entity) {
    delete this.speeds[entity]
    delete this.values[entity]
    return this.dequeue(entity)
  }

  peek() {
    let iteration = 0
    const { values, speeds, threshold } = this
    let next = null
    const test = e => (values[e] + (speeds[e] * iteration)) >= threshold

    do {
      iteration += 1
      next = this.toArray().find(test)
    } while (!next)

    return next
  }

  next() {
    let next = null
    const { values, speeds, threshold } = this

    do {
      const entity = super.next()
      const nextValue = values[entity] + speeds[entity]

      if (nextValue >= threshold) {
        values[entity] = 0
        next = entity
      } else {
        values[entity] = nextValue
      }
    } while (!next)

    return next
  }
}

export default EnergyQueue
