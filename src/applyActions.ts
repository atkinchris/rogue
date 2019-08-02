import MoveToAction from './actions/moveTo'
import Action from './types/action'
import World from './types/world'

const applyActions = (_world: World, actions: Action[]) => {
  actions
    .filter(action => !action.cancelled)
    .forEach(action => {
      if (action instanceof MoveToAction) {
        action.entity.moveTo(action.destination)
      }
    })
}

export default applyActions
