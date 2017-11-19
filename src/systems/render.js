const TILE_SIZE = 20

const renderSystem = () => {
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')
  const layers = []

  canvas.width = 10 * TILE_SIZE
  canvas.height = 10 * TILE_SIZE

  return (store) => {
    const entities = store.getEntitiesWith(['tile', 'position'])
    context.clearRect(0, 0, canvas.width, canvas.height)
    layers.forEach((layer) => {
      layer.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    })

    entities.forEach((entity) => {
      const tile = store.getComponent(entity, 'tile')
      const position = store.getComponent(entity, 'position')
      const x = position.x * TILE_SIZE
      const y = position.y * TILE_SIZE
      const { layer = 0 } = tile

      if (!layers[layer]) {
        layers[layer] = canvas.cloneNode()
      }

      const ctx = layers[layer].getContext('2d')

      ctx.fillStyle = 'black'
      ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE)

      ctx.font = '20px monospace'
      ctx.fillStyle = 'white'
      ctx.fillText(tile.character, x, y + TILE_SIZE)

      ctx.restore()
    })

    layers.forEach((layer) => {
      context.drawImage(layer, 0, 0)
    })
  }
}

export default renderSystem
