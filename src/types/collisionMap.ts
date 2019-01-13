import Entity from './entity'
import Position from './position'

const positionToString = ({ x, y }: { x: number; y: number }) => `${x},${y}`
const stringToPosition = (str: string) => {
  const [x, y] = str.split(',')
  return {
    x: Number.parseInt(x, 10),
    y: Number.parseInt(y, 10),
  }
}

class Collision {
  mapByPosition: Set<string>
  mapByEntity: Map<Entity, string>

  constructor() {
    this.mapByPosition = new Set()
    this.mapByEntity = new Map()
  }

  addEntityAt(entity: Entity, position: Position) {
    const existing = this.mapByEntity.get(entity)
    if (existing) {
      this.mapByPosition.delete(existing)
    }

    const positionKey = positionToString(position)

    this.mapByPosition.add(positionKey)
    this.mapByEntity.set(entity, positionKey)
  }

  getPositionFor(entity: Entity) {
    const positionKey = this.mapByEntity.get(entity)
    return positionKey && stringToPosition(positionKey)
  }

  isEntityAt(position: Position) {
    return this.mapByPosition.has(positionToString(position))
  }
}

export default Collision
