import Action from '../types/action'
import Position from '../types/position'
import Entity from '../types/entity'

class InteractAction extends Action {
  entity: Entity
  targetPosition?: Position
  targetEntities?: Entity[]

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
