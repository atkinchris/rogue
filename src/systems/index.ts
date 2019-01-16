import Action from '../types/action'
import World from '../types/world'
import System from '../types/system'

import interactionEntities from './interactionEntities'
import collision from './collision'
import bumpDoors from './bumpDoors'
import interactDoors from './interactDoors'

const systems = [interactionEntities, collision, bumpDoors, interactDoors]

class ActionsEngine {
  systems: System[]
  world: World

  constructor(world: World) {
    this.systems = systems
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
