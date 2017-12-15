import { posToString } from '../../utils/positions'
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
  const topLeft = col / (row + 1)
  const bottomRight = (col + 1) / (row + 1)
  return new Shadow(topLeft, bottomRight)
}

const transformOctant = ({ x, y }, row, col, octant) => {
  const [xx, xy, yx, yy] = OCTANTS[octant]

  return {
    x: x + (row * xx) + (col * xy),
    y: y + (row * yx) + (col * yy),
  }
}

const fieldOfVision = ({ player: pId }) => (store, action) => {
  if (!(action && action.entity === pId)) return

  const fogOfWar = store.getCache('fogOfWar') || {}
  const entities = store.getEntitiesWith(['position'], true)
  const player = store.getEntitiesWith(['playerControlled'])[0]
  const playerPosition = store.getComponent(player, 'position')
  const maxDistance = 20

  const visionMap = entities.reduce((map, entity) => {
    const pos = store.getComponent(entity, 'position')
    const blocksSight = store.hasComponent(entity, 'blocksSight')
    const posString = posToString(pos)
    const existing = map[posString]

    // eslint-disable-next-line no-param-reassign
    map[posString] = existing || blocksSight

    return map
  }, {})
  const visibles = {}
  const addVisibility = (pos, visible) => {
    visibles[posToString(pos)] = visible
    if (visible) {
      fogOfWar[posToString(pos)] = true
    }
  }
  const blocksSight = pos => !!visionMap[posToString(pos)]
  const isInBounds = pos => visionMap[posToString(pos)] !== undefined

  // Add player to visibility map
  addVisibility(playerPosition, true)

  OCTANTS.forEach((octant, octantIndex) => {
    const line = new ShadowLine()
    let fullShadow = false

    for (let row = 1; row < maxDistance; row += 1) {
      const position = transformOctant(playerPosition, row, 0, octantIndex)
      if (!isInBounds(position)) break

      for (let col = 0; col <= row; col += 1) {
        const pos = transformOctant(playerPosition, row, col, octantIndex)
        if (!isInBounds(pos)) break

        if (fullShadow) {
          addVisibility(pos, false)
          break
        }

        const projection = projectTile(row, col)
        const isVisible = !line.isInShadow(projection)
        addVisibility(pos, isVisible)

        if (isVisible && blocksSight(pos)) {
          line.add(projection)
          fullShadow = line.isFullShadow()
        }
      }
    }
  })

  store.setCache('vision', visibles)
  store.setCache('fogOfWar', fogOfWar)
}

export default fieldOfVision
