const attack = () => store => {
  const entities = store.getEntitiesWith(['attackIntent'])

  entities.forEach(entity => {
    const { target } = store.getComponent(entity, 'attackIntent')

    store.addComponent(target, 'receiveDamage', 1)
    store.removeComponent(entity, 'attackIntent')
  })
}

export default attack
