const createPlayer = (store) => {
  const entity = store.createEntity()

  store.addComponent(entity, 'position', { x: 1, y: 1 })
  store.addComponent(entity, 'tile', { character: '@' })
  store.addComponent(entity, 'playerControlled')
  store.addComponent(entity, 'collides')

  return entity
}

const createWall = (store, position) => {
  const entity = store.createEntity()

  store.addComponent(entity, 'position', position)
  store.addComponent(entity, 'tile', { character: '#' })
  store.addComponent(entity, 'collides')

  return entity
}

export {
  createPlayer,
  createWall,
}
