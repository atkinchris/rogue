const positionToString = ({ x, y }) => `${x},${y}`
const stringToPosition = string => {
  const [x, y] = string.split(',')
  return {
    x: Number.parseInt(x, 10),
    y: Number.parseInt(y, 10),
  }
}

class SpatialMap {
  constructor() {
    this.mapByPosition = new Map()
    this.mapByEntity = new Map()
  }

  addEntityAt(entity, position) {
    const existing = this.mapByEntity.get(entity)
    if (existing) {
      this.mapByPosition.delete(existing)
    }

    const positionKey = positionToString(position)

    this.mapByPosition.set(positionKey, entity)
    this.mapByEntity.set(entity, positionKey)
  }

  getPositionFor(entity) {
    const positionKey = this.mapByEntity.get(entity)
    return positionKey && stringToPosition(positionKey)
  }

  getEntityAt(position) {
    return this.mapByPosition(positionToString(position))
  }
}

export default SpatialMap
