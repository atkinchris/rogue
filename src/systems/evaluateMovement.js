const evaluateMovement = () => (store) => {
  const entities = store.getEntitiesWith(['moveIntent', 'position'])

  entities.forEach((entity) => {
    const intent = store.getComponent(entity, 'moveIntent')
    const { x, y } = store.getComponent(entity, 'position')
    const result = { x, y }

    switch (intent.direction) {
      case 'down':
        result.y += 1
        break
      case 'up':
        result.y -= 1
        break
      case 'left':
        result.x -= 1
        break
      case 'right':
        result.x += 1
        break
      default:
        break
    }

    store.addComponent(entity, 'moveIntent', result)
  })
}

export default evaluateMovement
