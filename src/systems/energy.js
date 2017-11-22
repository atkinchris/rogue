import { tickEnergy } from '../components/energy'

const energy = () => (store) => {
  const loop = true

  while (loop) {
    const entity = store.energyQueue.next()

    if (!entity || tickEnergy(store, entity)) {
      store.addComponent(entity, 'hasTurn')
      break
    }
  }
}

export default energy
