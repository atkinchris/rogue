import Deque from 'double-ended-queue'

import Entity from './entity'

class EnergyQueue {
  queue: Deque<Entity>
  entities: Map<Entity, number>

  constructor() {
    this.queue = new Deque()
    this.entities = new Map()
  }

  add(entity: Entity) {
    this.entities.set(entity, 0)
  }

  remove(entity: Entity) {
    this.entities.delete(entity)
  }

  next() {
    if (this.queue.isEmpty()) {
      this.entities.forEach((speed, entity) => {
        speed += 1

        if (speed > entity.takesTurns.speed) {
          this.queue.push(entity)
        }

        this.entities.set(entity, speed)
      })
    }

    return this.queue.shift()
  }
}

export default EnergyQueue
