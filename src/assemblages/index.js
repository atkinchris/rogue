import { addEnergy } from '../components/energy'

const createPlayer = (store, position) => {
  const entity = store.createEntity()

  store.addComponent(entity, 'type', 'player')
  store.addComponent(entity, 'position', position)
  store.addComponent(entity, 'visible')
  store.addComponent(entity, 'playerControlled')
  store.addComponent(entity, 'collides')
  store.addComponent(entity, 'canAttack')
  store.addComponent(entity, 'canOpenDoors')

  addEnergy(store, entity)

  return entity
}

const createMonster = (store, position) => {
  const entity = store.createEntity()

  store.addComponent(entity, 'type', 'monster')
  store.addComponent(entity, 'position', position)
  store.addComponent(entity, 'visible')
  store.addComponent(entity, 'collides')
  store.addComponent(entity, 'health', { value: 3 })
  store.addComponent(entity, 'cpuControlled')

  // Removed until AI is built
  // addEnergy(store, entity, { threshold: 1 })

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

  store.addComponent(entity, 'type', 'door-closed')
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
