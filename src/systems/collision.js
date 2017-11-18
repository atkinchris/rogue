const collisionSystem = () => (store) => {
  const entities = store.getEntitiesWith(['moveIntent', 'collides'])
  const geometry = store.getEntitiesWith(['position', 'collides'])

  entities.forEach((entity) => {
    const nextPosition = store.getComponent(entity, 'moveIntent')
    const willCollide = geometry.some((other) => {
      const position = store.getComponent(other, 'position')
      return (
        position.x === nextPosition.x &&
        position.y === nextPosition.y
      )
    })

    if (willCollide) {
      store.removeComponent(entity, 'moveIntent')
    }
  })
}

export default collisionSystem
