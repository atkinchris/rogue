import './canvas.css'

const TILE_SIZE = 20

const renderCanvas = () => {
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')
  const layers = []

  return ({ entities, bounds: { width, height } }) => {
    canvas.width = width * TILE_SIZE + TILE_SIZE
    canvas.height = height * TILE_SIZE + TILE_SIZE

    context.clearRect(0, 0, canvas.width, canvas.height)
    layers.forEach(layer => {
      layer.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    })

    entities.forEach(({ tile, position, visibility }) => {
      const x = position.x * TILE_SIZE
      const y = position.y * TILE_SIZE
      const { layer = 0, character } = tile

      if (!layers[layer]) {
        layers[layer] = canvas.cloneNode()
      }

      const ctx = layers[layer].getContext('2d')

      ctx.font = '20px monospace'
      ctx['font-weight'] = 300
      ctx['line-height'] = TILE_SIZE * 1.8

      if (visibility === 'visible') {
        ctx.globalAlpha = 1
      } else if (visibility === 'fogged') {
        ctx.globalAlpha = 0.5
      } else {
        ctx.globalAlpha = 0
      }

      ctx.fillStyle = '#101010'
      ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE)

      ctx.fillStyle = 'white'
      ctx.fillText(character, x, y + TILE_SIZE)

      ctx.restore()
    })

    layers.forEach(layer => {
      context.drawImage(layer, 0, 0)
    })
  }
}

export default renderCanvas
