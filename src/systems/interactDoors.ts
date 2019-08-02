/* eslint-disable no-param-reassign */
import InteractAction from '../actions/interact'
import Action from '../types/action'
import System from '../types/system'
import World from '../types/world'

const bumpDoorsSystem: System = {
  run: (_world: World, actions: Action[]) =>
    actions.reduce((out: Action[], action: Action) => {
      if (action instanceof InteractAction) {
        const door = action.targetEntities!.find(entity => !!entity.isDoor)

        if (!door) return out

        door.collides = !door.collides
        door.sprite.frame = door.collides ? 0 : 1
      }

      return out
    }, actions),
}

export default bumpDoorsSystem
