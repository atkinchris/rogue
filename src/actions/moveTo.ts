import Action from '../types/action'
import Entity from '../types/entity'
import Position from '../types/position'

class MoveToAction extends Action {
  public entity: Entity
  public destination: Position

  constructor(entity: Entity, destination: Position) {
    super()

    this.entity = entity
    this.destination = destination
  }
}

export default MoveToAction
