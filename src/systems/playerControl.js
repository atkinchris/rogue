const playerControl = () => (store, breakLoop) => {
  const intent = store.getCache('playerIntent')

  if (intent && intent.type) {
    const entities = store.getEntitiesWith(['playerControlled', 'hasTurn'])

    entities.forEach((entity) => {
      switch (intent.type) {
        case 'move':
          store.addComponent(entity, 'moveIntent', intent)
          store.removeComponent(entity, 'hasTurn')
          break
        default:
          breakLoop('Invalid intent from ', entity)
          break
      }
    })
  } else {
    // breakLoop('No intent found')
  }

  store.setCache('playerIntent', null)
}

export default playerControl
