const renderSystem = () => {
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')

  return (store) => {
    const entities = store.getEntitiesWith(['tile', 'position'])
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)

    entities.forEach((entity) => {
      const tile = store.getComponent(entity, 'tile')
      const position = store.getComponent(entity, 'position')

      context.font = '20px monospace'
      context.fillStyle = 'white'

      context.fillText(tile.character, position.x * 20, (position.y * 20) + 20)
    })
  }
}

export default renderSystem
