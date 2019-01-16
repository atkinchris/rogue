import World from './types/world'
import Action from './types/action'
import MoveToAction from './actions/moveTo'

const applyActions = (world: World, actions: Action[]) => {
  actions
    .filter(action => !action.cancelled)
    .forEach(action => {
      if (action instanceof MoveToAction) {
        action.entity.moveTo(action.destination)
      }
    })
}

export default applyActions
