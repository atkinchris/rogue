import InteractAction from '../actions/interact'
import MoveToAction from '../actions/moveTo'
import Action from '../types/action'
import Entity from '../types/entity'
import World from '../types/world'

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
