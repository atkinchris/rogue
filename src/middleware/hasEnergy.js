const COMPONENT = 'hasEnergy'

const addEnergy = (store, entity, { speed } = {}) => {
  store.turnQueue.add(entity, { speed })
}

const removeEnergy = (store, entity) => {
  store.turnQueue.remove(entity)
}

export default {
  COMPONENT,
  onAdd: addEnergy,
  onRemove: removeEnergy,
}
