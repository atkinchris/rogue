/* eslint-disable no-param-reassign */
import Action from '../types/action'
import System from '../types/system'
import World from '../types/world'

import CollisionAction from '../actions/collision'
import MoveToAction from '../actions/moveTo'

const collisionSystem: System = {
  run: (world: World, actions: Action[]) =>
    actions.reduce((out: Action[], action: Action) => {
      if (action instanceof MoveToAction) {
        const entitiesAtLocation = world.positionMap.getAtPoint(action.destination)
        const collision = entitiesAtLocation && entitiesAtLocation.find(e => e.collides)

        if (collision) {
          action.cancel()
          out.push(new CollisionAction(action.entity, collision))
        }
      }

      return out
    }, actions),
}

export default collisionSystem
