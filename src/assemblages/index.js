const createPlayer = (store, position) => {
  const entity = store.createEntity()

  store.addComponent(entity, 'position', position)
  store.addComponent(entity, 'tile', { character: '@', layer: 1 })
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

const createFloor = (store, position) => {
  const entity = store.createEntity()

  store.addComponent(entity, 'position', position)
  store.addComponent(entity, 'tile', { character: '.' })

  return entity
}

export {
  createPlayer,
  createWall,
  createFloor,
}
