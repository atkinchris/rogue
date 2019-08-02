import InputHandler from '../inputHandler'
import EnergyQueue from './energyQueue'
import Entity from './entity'
import PositionMap from './positionMap'

import { neighboursToFrame, neighboursToRotation } from '../utils/neighbours'

class World {
  public entities: Map<string, Entity>
  public energyQueue: EnergyQueue
  public inputHandler: InputHandler
  public positionMap: PositionMap

  constructor() {
    this.entities = new Map()

    this.energyQueue = new EnergyQueue()
    this.inputHandler = new InputHandler()
    this.positionMap = new PositionMap()
  }

  public handleEntityMoved(entity: Entity) {
    this.positionMap.add(entity)
  }

  public addEntity(entity: Entity) {
    this.entities.set(entity.id, entity)

    if (entity.position) {
      this.positionMap.add(entity)
    }

    if (entity.takesTurns) {
      this.energyQueue.add(entity)
    }
  }

  public getEntityById(id: string) {
    return this.entities.get(id)
  }

  public updateSprites() {
    this.entities.forEach(entity => {
      if (!entity.sprite) return

      if (entity.sprite.isContinuous) {
        const matchingNeighbours = this.positionMap
          .getNeighbours(entity.position)
          .map(
            items =>
              items.map(item => this.getEntityById(item.id)).filter(e => e && e.sprite.name === entity.sprite.name)
                .length > 0
          )

        const frame = neighboursToFrame(matchingNeighbours)

        // eslint-disable-next-line no-param-reassign
        entity.sprite.frame = frame
      }

      if (entity.sprite.fitsInWalls) {
        const matchingNeighbours = this.positionMap
          .getNeighbours(entity.position)
          .map(
            items =>
              items.map(item => this.getEntityById(item.id)).filter(e => e && e.sprite.name === 'wall').length > 0
          )

        const rotation = neighboursToRotation(matchingNeighbours)

        // eslint-disable-next-line no-param-reassign
        entity.sprite.rotation = rotation
      }
    })
  }
}

export default World
