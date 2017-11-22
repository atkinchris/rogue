const death = () => (store) => {
  const entities = store.getEntitiesWith(['health'])

  entities.forEach((entity) => {
    const health = store.getComponent(entity, 'health')

    if (health && health.value < 0) {
      store.removeEntity(entity)
    }
  })
}

export default death
