import Action from '../types/action'
import Entity from '../types/entity'
import World from '../types/world'
import playerControlled from './playerControlled'

class BehaviourEngine {
  public world: World
  public behaviours: Map<string, (world: World, entity: Entity) => Action | null>

  constructor(world: World) {
    this.world = world
    this.behaviours = new Map()

    this.behaviours.set('playerControlled', playerControlled)
  }

  public getAction(behaviour: string, entity: Entity) {
    const behaviourEngine = this.behaviours.get(behaviour)

    if (behaviourEngine) {
      return behaviourEngine(this.world, entity)
    }

    return null
  }
}

export default BehaviourEngine
