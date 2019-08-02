import Deque from 'double-ended-queue'

import Entity from './entity'

class EnergyQueue {
  public queue: Deque<Entity>
  public entities: Map<Entity, number>

  constructor() {
    this.queue = new Deque()
    this.entities = new Map()
  }

  public add(entity: Entity) {
    this.entities.set(entity, 0)
  }

  public remove(entity: Entity) {
    this.entities.delete(entity)
  }

  public next() {
    if (this.queue.isEmpty()) {
      this.entities.forEach((speed, entity) => {
        const newSpeed = speed + 1

        if (newSpeed > entity.takesTurns!.speed) {
          this.queue.push(entity)
        }

        this.entities.set(entity, newSpeed)
      })
    }

    return this.queue.shift()
  }
}

export default EnergyQueue
