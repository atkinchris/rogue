import Action from '../types/action'
import Position from '../types/position'
import Entity from '../types/entity'

class MoveToAction extends Action {
  entity: Entity
  destination: Position

  constructor(entity: Entity, destination: Position) {
    super()

    this.entity = entity
    this.destination = destination
  }
}

export default MoveToAction
