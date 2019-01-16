import Action from './types/action'
import World from './types/world'

const applyActions = (world: World, actions: Action[]) => {
  actions
    .filter(action => !action.cancelled)
    .forEach(action => {
      switch (action.type) {
        case 'moveTo':
          action.subject.moveTo(action.payload)
          break
        default:
          break
      }
    })
}

export default applyActions
