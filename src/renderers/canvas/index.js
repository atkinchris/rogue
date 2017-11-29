import posToString from '../utils/posToString'
import tiles from './renderReact/tiles'

const TILE_SIZE = 20

const renderCanvas = () => {
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')
  const layers = []

  canvas.width = 20 * TILE_SIZE
  canvas.height = 20 * TILE_SIZE

  return (store) => {
    const entities = store.getEntitiesWith(['visible', 'position'])
    const vision = store.getCache('vision')
    context.clearRect(0, 0, canvas.width, canvas.height)
    layers.forEach((layer) => {
      layer.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    })

    entities.forEach((entity) => {
      const type = store.getComponent(entity, 'type')
      const position = store.getComponent(entity, 'position')
      const isVisible = vision[posToString(position)]
      const x = position.x * TILE_SIZE
      const y = position.y * TILE_SIZE
      const { layer = 0, character } = tiles[type]

      if (!layers[layer]) {
        layers[layer] = canvas.cloneNode()
      }

      const ctx = layers[layer].getContext('2d')

      ctx.fillStyle = 'black'
      ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE)

      ctx.font = '20px monospace'
      ctx.globalAlpha = isVisible ? 1 : 0.5
      ctx.fillStyle = 'white'
      ctx.fillText(character, x, y + TILE_SIZE)

      ctx.restore()
    })

    layers.forEach((layer) => {
      context.drawImage(layer, 0, 0)
    })
  }
}

export default renderCanvas
