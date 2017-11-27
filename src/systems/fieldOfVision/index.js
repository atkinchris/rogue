import posToString from '../../utils/posToString'
import Shadow from './Shadow'
import ShadowLine from './ShadowLine'

const OCTANTS = [
  [-1, 0, 0, 1],
  [0, -1, 1, 0],
  [0, -1, -1, 0],
  [-1, 0, 0, -1],
  [1, 0, 0, -1],
  [0, 1, -1, 0],
  [0, 1, 1, 0],
  [1, 0, 0, 1],
]

const projectTile = (row, col) => {
  const topLeft = col / (row + 2)
  const bottomRight = (col + 1) / (row + 1)
  return new Shadow(topLeft, bottomRight)
}

const fieldOfVision = () => (store) => {
  const entities = store.getEntitiesWith(['position', 'blocksSight'])
  const player = store.getEntitiesWith(['playerControlled'])[0]
  const position = store.getComponent(player, 'position')
  const maxDistance = 4

  const visionMap = entities.reduce((map, entity) => {
    const pos = store.getComponent(entity, 'position')

    return {
      ...map,
      [posToString(pos)]: entity,
    }
  }, {})
  const visibles = {}
  const addVisibility = (pos, visible) => { visibles[posToString(pos)] = visible }
  const blocksSight = pos => !!visionMap[posToString(pos)]

  // Add player to visibility map
  addVisibility(position, true)

  OCTANTS.forEach((octant) => {
    const [xx, xy, yx, yy] = octant
    const line = new ShadowLine()
    let fullShadow = false

    for (let row = 1; row < maxDistance; row += 1) {
      for (let col = 0; col <= row; col += 1) {
        const pos = {
          x: position.x + (row * xx) + (col * xy),
          y: position.y + (row * yx) + (col * yy),
        }

        if (fullShadow) {
          addVisibility(pos, false)
          return
        }

        const projection = projectTile(row, col)
        const isVisible = !line.isInShadow(projection)
        addVisibility(pos, isVisible)

        if (isVisible && blocksSight(pos)) {
          line.add(projection)
          fullShadow = line.isFullShadow
        }
      }
    }
  })

  store.setCache('vision', visibles)
}

export default fieldOfVision
