import playerControlled from './playerControlled'

const BEHAVIOURS = {
  playerControlled,
}

class BehaviourEngine {
  constructor(world) {
    this.world = world
  }

  getAction(behaviour, entity) {
    BEHAVIOURS[behaviour](this.world, entity)
  }
}

export default BehaviourEngine
