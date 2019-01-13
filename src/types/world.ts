import CollisionMap from './collisionMap'
import EnergyQueue from './energyQueue'
import InputHandler from '../inputHandler'
import Entity from './entity'
import PositionMap from './positionMap'

class World {
  entities: Map<string, Entity>
  collisionMap: CollisionMap
  energyQueue: EnergyQueue
  inputHandler: InputHandler
  positionMap: PositionMap

  constructor() {
    this.entities = new Map()

    this.collisionMap = new CollisionMap()
    this.energyQueue = new EnergyQueue()
    this.inputHandler = new InputHandler()
    this.positionMap = new PositionMap()
  }

  handleEntityMoved(entity: Entity) {
    if (entity.collides) {
      this.collisionMap.addEntityAt(entity, entity.position)
    }
  }

  addEntity(entity: Entity) {
    this.entities.set(entity.id, entity)

    if (entity.position) {
      this.positionMap.add(entity)
    }

    if (entity.position && entity.collides) {
      this.collisionMap.addEntityAt(entity, entity.position)
    }

    if (entity.takesTurns) {
      this.energyQueue.add(entity)
    }
  }

  getEntityById(id: string) {
    return this.entities.get(id)
  }
}

export default World
