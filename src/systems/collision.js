const collisionSystem = () => (store) => {
  const entities = store.getEntitiesWith(['moveIntent', 'collides'])
  const collisionMap = store.getCache('collisions')

  entities.forEach((entity) => {
    const { x, y } = store.getComponent(entity, 'moveIntent')

    if (collisionMap[`${x},${y}`]) {
      store.removeComponent(entity, 'moveIntent')
    }
  })
}

export default collisionSystem
