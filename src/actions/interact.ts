import Action from '../types/action'
import Entity from '../types/entity'
import Position from '../types/position'

class InteractAction extends Action {
  public entity: Entity
  public targetPosition?: Position
  public targetEntities?: Entity[]

  constructor(entity: Entity, targetPosition?: Position, targetEntities?: Entity[]) {
    super()

    this.entity = entity

    if (!targetPosition && !targetEntities) {
      throw Error('Target position or entities must be set')
    }

    this.targetPosition = targetPosition
    this.targetEntities = targetEntities
  }
}

export default InteractAction
