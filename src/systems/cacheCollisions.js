const cacheCollisions = () => (store) => {
  const entities = store.getEntitiesWith(['collides', 'position'])

  const collisionMap = entities.reduce((map, entity) => {
    const { x, y } = store.getComponent(entity, 'position')

    return {
      ...map,
      [`${x},${y}`]: entity,
    }
  }, {})

  store.setCache('collisions', collisionMap)
}

export default cacheCollisions
