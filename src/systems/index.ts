import Action from '../types/action'
import System from '../types/system'
import World from '../types/world'

import bumpDoors from './bumpDoors'
import collision from './collision'
import interactDoors from './interactDoors'
import interactionEntities from './interactionEntities'

const systems = [interactionEntities, collision, bumpDoors, interactDoors]

class ActionsEngine {
  public systems: System[]
  public world: World

  constructor(world: World) {
    this.systems = systems
    this.world = world
  }

  public addSystem(system: System) {
    this.systems.push(system)
  }

  public run(action: Action) {
    return this.systems.reduce((actions, system) => system.run(this.world, actions), [action])
  }
}

export default ActionsEngine
