const addEnergy = (store, entity, { threshold }) => {
  store.energyQueue.enqueue(entity)
  store.addComponent(entity, 'energy', { current: 0, threshold })
}

const removeEnergy = (store, entity) => {
  store.energyQueue.remove(entity)
  store.removeComponent(entity, 'energy')
}

const tickEnergy = (store, entity) => {
  const energy = store.getComponent(entity, 'energy')

  if (!energy) {
    throw Error('Entity does not have energy')
  }

  const { current, threshold } = energy
  const next = current + 1

  if (next > threshold) {
    store.addComponent(entity, 'energy', { current: 0, threshold })
    return true
  }

  store.addComponent(entity, 'energy', { current: next, threshold })
  return false
}

export {
  addEnergy,
  removeEnergy,
  tickEnergy,
}
