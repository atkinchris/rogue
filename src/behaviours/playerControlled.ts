import World from '../types/world'
import Entity from '../types/entity'
import Action from '../types/action'
import MoveToAction from '../actions/moveTo'
import InteractAction from '../actions/interact'

const getAction = (world: World, entity: Entity): Action | null => {
  const keys = world.inputHandler.getKeys()

  if (!keys) {
    return null
  }

  if (keys.left || keys.right || keys.up || keys.down) {
    const position = { ...entity.position }

    if (keys.left) position.x -= 1
    else if (keys.right) position.x += 1
    else if (keys.up) position.y -= 1
    else if (keys.down) position.y += 1

    if (keys.shift) {
      return new InteractAction(entity, position)
    }

    return new MoveToAction(entity, position)
  }

  return null
}

export default getAction
