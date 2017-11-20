import { createGravestone } from '../assemblages'

const death = () => (store) => {
  const entities = store.getEntitiesWith(['health'])

  entities.forEach((entity) => {
    const health = store.getComponent(entity, 'health')
    const position = store.getComponent(entity, 'position')

    if (health && health.value < 0) {
      store.removeEntity(entity)

      if (position) {
        createGravestone(store, position)
      }
    }
  })
}

export default death
