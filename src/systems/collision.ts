/* eslint-disable no-param-reassign */
import Action from '../types/action'
import System from '../types/system'
import World from '../types/world'

const collisionSystem: System = {
  run: (world: World, actions: Action[]) =>
    actions.reduce((out: Action[], action: Action) => {
      if (action.type === 'moveTo') {
        const entitiesAtLocation = world.positionMap.getAtPoint(action.payload)

        const collision = entitiesAtLocation && entitiesAtLocation.find(e => e.collides)

        if (collision) {
          action.type = 'collision'
          action.payload = collision
        }
      }

      return out
    }, actions),
}

export default collisionSystem
