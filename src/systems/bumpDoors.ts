/* eslint-disable no-param-reassign */
import CollisionAction from '../actions/collision'
import InteractAction from '../actions/interact'
import Action from '../types/action'
import System from '../types/system'
import World from '../types/world'

const bumpDoorsSystem: System = {
  run: (_world: World, actions: Action[]) =>
    actions.reduce((out: Action[], action: Action) => {
      if (action instanceof CollisionAction && action.collidesWith.isDoor) {
        action.cancel()
        const interaction = new InteractAction(action.entity, undefined, [action.collidesWith])
        out.push(interaction)
      }

      return out
    }, actions),
}

export default bumpDoorsSystem
