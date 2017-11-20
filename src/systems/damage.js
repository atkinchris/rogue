const receiveDamage = () => (store) => {
  const entities = store.getEntitiesWith(['receiveDamage'])

  entities.forEach((entity) => {
    const damage = store.getComponent(entity, 'receiveDamage')
    const { value } = store.getComponent(entity, 'health')

    store.addComponent(entity, 'health', { value: value - damage })
    store.removeComponent(entity, 'receiveDamage')
  })
}

export default receiveDamage
