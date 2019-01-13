const getAction = (world, entity) => {
  const keys = world.getResource('inputHandler').getKeys()

  if (!!keys && (keys.left || keys.right || keys.up || keys.down)) {
    const action = {
      subject: entity,
      type: 'moveTo',
      payload: {
        ...entity.position,
      },
    }

    if (keys.left) action.payload.x -= 1
    else if (keys.right) action.payload.x += 1
    else if (keys.up) action.payload.y -= 1
    else if (keys.down) action.payload.y += 1

    return action
  }

  return null
}

export default getAction
