/* eslint-disable no-param-reassign */
import InteractAction from '../actions/interact'
import Action from '../types/action'
import System from '../types/system'
import World from '../types/world'

const bumpDoorsSystem: System = {
  run: (world: World, actions: Action[]) =>
    actions.reduce((out: Action[], action: Action) => {
      if (action instanceof InteractAction && !action.targetEntities) {
        action.targetEntities = world.positionMap.getAtPoint(action.targetPosition!)
      }

      return out
    }, actions),
}

export default bumpDoorsSystem
