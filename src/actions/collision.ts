import Action from '../types/action'
import Entity from '../types/entity'

class Collision extends Action {
  entity: Entity
  collidesWith: Entity

  constructor(entity: Entity, collidesWith: Entity) {
    super()

    this.entity = entity
    this.collidesWith = collidesWith
  }
}

export default Collision
