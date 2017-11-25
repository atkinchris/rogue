const addEnergy = (store, entity, { speed } = {}) => {
  store.turnQueue.add(entity, { speed })
  store.addComponent(entity, 'hasEnergy')
}

const removeEnergy = (store, entity) => {
  store.turnQueue.remove(entity)
  store.removeComponent(entity, 'hasEnergy')
}

export {
  addEnergy,
  removeEnergy,
}
