const attack = () => (store) => {
  const entities = store.getEntitiesWith(['attackIntent'])

  entities.forEach((entity) => {
    console.log('Attacker!', entity)

    store.removeComponent(entity, 'attackIntent')
  })
}

export default attack
