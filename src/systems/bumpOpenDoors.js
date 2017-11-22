const bumpOpenDoors = () => (store) => {
  const entities = store.getEntitiesWith(['moveIntent', 'collides', 'canOpenDoors'])
  const collisionMap = store.getCache('collisions')

  entities.forEach((entity) => {
    const { x, y } = store.getComponent(entity, 'moveIntent')
    const collidingEntity = collisionMap[`${x},${y}`]

    if (
      collidingEntity &&
      store.getComponent(collidingEntity, 'type') === 'doorClosed'
    ) {
      store.addComponent(collidingEntity, 'type', 'doorOpen')
      store.removeComponent(collidingEntity, 'collides')

      store.removeComponent(entity, 'moveIntent')
    }
  })
}

export default bumpOpenDoors
