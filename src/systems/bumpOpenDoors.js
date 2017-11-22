const bumpOpenDoors = () => (store) => {
  const entities = store.getEntitiesWith(['moveIntent', 'collides', 'canOpenDoors'])
  const collisionMap = store.getCache('collisions')

  entities.forEach((entity) => {
    const { x, y } = store.getComponent(entity, 'moveIntent')
    const collidingEntity = collisionMap[`${x},${y}`]

    if (collidingEntity && store.getComponent(collidingEntity, 'isDoor')) {
      store.removeComponent(entity, 'moveIntent')
      store.removeComponent(collidingEntity, 'collides')
      store.addComponent(collidingEntity, 'tile', { character: '\'' })
    }
  })
}

export default bumpOpenDoors
