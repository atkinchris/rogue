const createPlayer = (store, position) => {
  const entity = store.createEntity()

  store.addComponent(entity, 'position', position)
  store.addComponent(entity, 'tile', { character: '@', layer: 1 })
  store.addComponent(entity, 'playerControlled')
  store.addComponent(entity, 'collides')
  store.addComponent(entity, 'canAttack')

  return entity
}

const createEnemy = (store, position) => {
  const entity = store.createEntity()

  store.addComponent(entity, 'position', position)
  store.addComponent(entity, 'tile', { character: 'K', layer: 1 })
  store.addComponent(entity, 'collides')
  store.addComponent(entity, 'health')

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
  createEnemy,
  createWall,
  createFloor,
}
