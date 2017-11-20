const bumpAttack = () => (store) => {
  const entities = store.getEntitiesWith(['moveIntent', 'collides', 'canAttack'])
  const collisionMap = store.getCache('collisions')

  entities.forEach((entity) => {
    const { x, y } = store.getComponent(entity, 'moveIntent')
    const collidingEntity = collisionMap[`${x},${y}`]

    if (collidingEntity && store.getComponent(collidingEntity, 'health')) {
      store.removeComponent(entity, 'moveIntent')
      store.addComponent(entity, 'attackIntent', { target: collidingEntity })
    }
  })
}

export default bumpAttack
