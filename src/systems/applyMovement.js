const applyMovement = () => (store) => {
  const entities = store.getEntitiesWith(['moveIntent', 'position'])

  entities.forEach((entity) => {
    const intent = store.getComponent(entity, 'moveIntent')

    store.addComponent(entity, 'position', intent)
    store.removeComponent(entity, 'moveIntent')
  })
}

export default applyMovement
