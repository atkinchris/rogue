import Deque from 'double-ended-queue'

class EnergyQueue {
  constructor() {
    this.queue = new Deque()
    this.entities = new Map()
  }

  add(entity, speed = 10) {
    this.entities.set(entity, { speed, energy: 0 })
  }

  remove(entity) {
    this.entities.delete(entity)
  }

  next() {
    if (this.queue.isEmpty()) {
      this.entities.forEach((entity, id) => {
        // eslint-disable-next-line no-param-reassign
        entity.energy += 1

        if (entity.energy > entity.speed) {
          this.queue.push(id)
        }
      })
    }

    return this.queue.shift()
  }
}

export default EnergyQueue
