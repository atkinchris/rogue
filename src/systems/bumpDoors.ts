/* eslint-disable no-param-reassign */
import Action from '../types/action'
import System from '../types/system'
import World from '../types/world'
import CollisionAction from '../actions/collision'

const bumpDoorsSystem: System = {
  run: (_world: World, actions: Action[]) =>
    actions.reduce((out: Action[], action: Action) => {
      if (action instanceof CollisionAction && action.collidesWith.isDoor) {
        action.collidesWith.sprite.frame = 1
        action.collidesWith.collides = false
      }

      return out
    }, actions),
}

export default bumpDoorsSystem
