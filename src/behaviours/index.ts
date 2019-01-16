import playerControlled from './playerControlled'
import World from '../types/world'
import Entity from '../types/entity'
import Action from '../types/action'

class BehaviourEngine {
  world: World
  behaviours: Map<string, (world: World, entity: Entity) => Action | null>

  constructor(world: World) {
    this.world = world
    this.behaviours = new Map()

    this.behaviours.set('playerControlled', playerControlled)
  }

  getAction(behaviour: string, entity: Entity) {
    const behaviourEngine = this.behaviours.get(behaviour)

    if (behaviourEngine) {
      return behaviourEngine(this.world, entity)
    }

    return null
  }
}

export default BehaviourEngine
