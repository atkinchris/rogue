const renderSystem = context => (store) => {
  const entities = store.getEntitiesWith(['tile', 'position'])
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)

  entities.forEach((entity) => {
    const tile = store.getComponent(entity, 'tile')
    const position = store.getComponent(entity, 'position')

    // eslint-disable-next-line no-param-reassign
    context.font = '20px monospace'
    // eslint-disable-next-line no-param-reassign
    context.fillStyle = 'white'

    context.fillText(tile.character, position.x * 20, (position.y * 20) + 20)
  })
}

export default renderSystem
