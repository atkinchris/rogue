const posToString = ({ x, y }) => `${x},${y}`
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

const castVisibility = (position, row, visSlopeStart, visSlopeEnd, radius, transform, checkLightPasses, addVisible) => {
  console.log(transform)
  if (visSlopeStart < visSlopeEnd) return

  const { x: startX, y: startY } = position
  const [xx, xy, yx, yy] = transform

  for (let i = row; i <= radius; i += 1) {
    let blocked = false
    let newStart = 0
    let dx = -i - 1
    const dy = -i

    while (dx <= 0) {
      dx += 1

      // Translate from relative coordinates to map coordinates
      const mapX = startX + (dx * xx) + (dy * xy)
      const mapY = startY + (dx * yx) + (dy * yy)

      // Range of the row
      const slopeStart = (dx - 0.5) / (dy + 0.5)
      const slopeEnd = (dx + 0.5) / (dy - 0.5)

      // Ignore if not yet at left edge of Octant
      if (slopeEnd > visSlopeStart) continue

      // Done if past right edge
      if (slopeStart < visSlopeEnd) break

      // If it's in range, it's visible
      if (((dx * dx) + (dy * dy)) < (radius * radius)) {
        addVisible({ x: mapX, y: mapY }, i, 1)
      }

      if (!blocked) {
        // If tile is a blocking tile, cast around it
        if (!checkLightPasses(mapX, mapY) && i < radius) {
          blocked = true
          castVisibility(position, i + 1, visSlopeStart, slopeStart, radius, transform, checkLightPasses, addVisible)
          newStart = slopeEnd
        }
      } else {
        // Keep narrowing if scanning across a block
        if (!checkLightPasses(mapX, mapY)) {
          newStart = slopeEnd
          continue
        }

        // Block has ended
        blocked = false
        visSlopeStart = newStart
      }
    }
    if (blocked) { break }
  }
}

const fieldOfVision = () => (store) => {
  const entities = store.getEntitiesWith(['visible', 'position', 'blocksSight'])
  const player = store.getEntitiesWith(['playerControlled'])[0]
  const position = store.getComponent(player, 'position')
  const R = 10

  const visionMap = entities.reduce((map, entity) => {
    const pos = store.getComponent(entity, 'position')

    return {
      ...map,
      [posToString(pos)]: entity,
    }
  }, {})
  const visibles = {}
  const addVisible = (pos) => { visibles[posToString(pos)] = true }
  const checkLightPasses = pos => !!visionMap[posToString(pos)]

  // Add player to visibility map
  addVisible(position)

  OCTANTS.forEach(octant => castVisibility(
    position,
    1,
    1.0,
    0.0,
    R + 1,
    octant,
    checkLightPasses,
    addVisible,
  ))

  store.setCache('vision', visibles)
}

export default fieldOfVision
