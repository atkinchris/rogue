import Action from '../types/action'
import World from '../types/world'
import System from '../types/system'

class ActionsEngine {
  systems: System[]
  world: World

  constructor(world: World) {
    this.systems = []
    this.world = world
  }

  addSystem(system: System) {
    this.systems.push(system)
  }

  run(action: Action) {
    return this.systems.reduce((actions, system) => system.run(this.world, actions), [action])
  }
}

export default ActionsEngine
