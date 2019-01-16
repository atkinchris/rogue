import World from '../types/world'
import Entity from '../types/entity'
import MoveToAction from '../actions/moveTo'

const getAction = (world: World, entity: Entity) => {
  const keys = world.inputHandler.getKeys()

  if (!!keys && (keys.left || keys.right || keys.up || keys.down)) {
    const position = { ...entity.position }

    if (keys.left) position.x -= 1
    else if (keys.right) position.x += 1
    else if (keys.up) position.y -= 1
    else if (keys.down) position.y += 1

    return new MoveToAction(entity, position)
  }

  return null
}

export default getAction
