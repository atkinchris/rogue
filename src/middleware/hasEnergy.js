const COMPONENT = 'hasEnergy'

const onAdd = (store, component, entity, { speed } = {}) => {
  if (component === COMPONENT) {
    store.turnQueue.add(entity, { speed })
  }
}

const onRemove = (store, component, entity) => {
  if (component === COMPONENT) {
    store.turnQueue.remove(entity)
  }
}

export default {
  onAdd,
  onRemove,
}
