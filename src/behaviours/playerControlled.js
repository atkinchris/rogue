const getAction = (world, entity) => {
  const { inputHandler } = world.resources
  const keys = inputHandler.getKeys()

  if (keys && (keys.left || keys.right || keys.up || keys.down)) {
    const pos = world.components.position.get(entity) || {}

    if (keys.left) pos.x -= 1
    else if (keys.right) pos.x += 1
    else if (keys.up) pos.y -= 1
    else if (keys.down) pos.y += 1

    world.components.position.add(entity, pos)
  }
}

export default getAction
