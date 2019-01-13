import rbush from 'rbush'

import SpatialMap from './spatialMap'
import EnergyQueue from './energyQueue'
import InputHandler from './inputHandler'

class World {
  constructor() {
    this.entities = new Map()
    this.resources = {
      collisionMap: new SpatialMap(),
      positionMap: rbush(),
      energyQueue: new EnergyQueue(),
      inputHandler: new InputHandler(),
    }
  }

  handleEntityMoved(entity) {
    if (entity.collides) {
      this.resources.collisionMap.addEntityAt(entity.id, entity.position)
    }
  }

  addEntity(entity) {
    this.entities.set(entity.id, entity)

    if (entity.position) {
      this.resources.positionMap.insert({
        minX: entity.position.x,
        maxX: entity.position.x,
        minY: entity.position.y,
        maxY: entity.position.y,
        id: entity.id,
      })
    }

    if (entity.position && entity.collides) {
      this.resources.collisionMap.addEntityAt(entity.id, entity.position)
    }

    if (entity.takesTurns) {
      this.resources.energyQueue.add(entity, entity.takesTurns.speed)
    }
  }

  getEntityById(id) {
    return this.entities.get(id)
  }

  addResource(id, resource) {
    this.resources[id] = resource
  }

  getResource(id) {
    return this.resources[id]
  }
}

export default World
