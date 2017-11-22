const createPlayer = (store, position) => {
  const entity = store.createEntity()

  store.addComponent(entity, 'type', 'player')
  store.addComponent(entity, 'position', position)
  store.addComponent(entity, 'visible')
  store.addComponent(entity, 'playerControlled')
  store.addComponent(entity, 'collides')
  store.addComponent(entity, 'canAttack')
  store.addComponent(entity, 'canOpenDoors')

  return entity
}

const createMonster = (store, position) => {
  const entity = store.createEntity()

  store.addComponent(entity, 'type', 'monster')
  store.addComponent(entity, 'position', position)
  store.addComponent(entity, 'visible')
  store.addComponent(entity, 'collides')
  store.addComponent(entity, 'health', { value: 3 })

  return entity
}

const createWall = (store, position) => {
  const entity = store.createEntity()

  store.addComponent(entity, 'type', 'wall')
  store.addComponent(entity, 'position', position)
  store.addComponent(entity, 'visible')
  store.addComponent(entity, 'collides')

  return entity
}

const createDoor = (store, position) => {
  const entity = store.createEntity()

  store.addComponent(entity, 'type', 'doorClosed')
  store.addComponent(entity, 'position', position)
  store.addComponent(entity, 'visible')
  store.addComponent(entity, 'collides')
  store.addComponent(entity, 'isDoor')

  return entity
}

const createFloor = (store, position) => {
  const entity = store.createEntity()

  store.addComponent(entity, 'type', 'floor')
  store.addComponent(entity, 'position', position)
  store.addComponent(entity, 'visible')

  return entity
}

export {
  createPlayer,
  createMonster,
  createWall,
  createDoor,
  createFloor,
}
