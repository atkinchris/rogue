/* eslint-disable no-param-reassign */
import Action from './types/action'
import World from './types/world'

const processAction = (world: World, action: Action) => {
  if (action.type === 'moveTo') {
    const entitiesAtLocation = world.positionMap.getAtPoint(action.payload)

    if (entitiesAtLocation && entitiesAtLocation.some(e => e.collides)) {
      action.cancelled = true
    }
  }

  return [action]
}

export default processAction
