import rbush from 'rbush'

import Entity from './entity'
import Position from './position'

const positionToString = ({ x, y }: { x: number; y: number }) => `${x},${y}`

interface PositionResult {
  x: number
  y: number
  id: string
}

interface PositionEntry {
  minX: number
  maxX: number
  minY: number
  maxY: number
  id: string
}

class PositionMap {
  tree: any
  entriesById: Map<string, PositionEntry>
  mapByPosition: Map<string, Set<Entity>>

  constructor() {
    this.tree = rbush()
    this.entriesById = new Map()
    this.mapByPosition = new Map()
  }

  add(entity: Entity) {
    if (this.entriesById.has(entity.id)) {
      this.remove(entity)
    }

    const entry = {
      minX: entity.position.x,
      maxX: entity.position.x,
      minY: entity.position.y,
      maxY: entity.position.y,
      id: entity.id,
    }
    this.tree.insert(entry)
    this.entriesById.set(entity.id, entry)

    const positionHash = positionToString(entity.position)
    const set = this.mapByPosition.get(positionHash) || new Set()
    set.add(entity)
    this.mapByPosition.set(positionHash, set)
  }

  remove(entity: Entity) {
    const positionEntry = this.entriesById.get(entity.id)
    this.tree.remove(positionEntry)
    this.entriesById.delete(entity.id)

    const positionHash = positionToString(entity.position)
    const set = this.mapByPosition.get(positionHash)

    if (set) {
      set.delete(entity)
    }
  }

  getAtPoint(position: Position) {
    const set = this.mapByPosition.get(positionToString(position))
    return set && Array.from(set)
  }

  getInRectangle(x: number, y: number, width: number, height: number): PositionResult[] {
    return this.tree
      .search({
        minX: x,
        minY: y,
        maxX: x + width,
        maxY: y + height,
      })
      .map(
        ({ minX, minY, id }: { minX: number; minY: number; id: string }): PositionResult => ({
          x: minX,
          y: minY,
          id,
        })
      )
  }

  getNeighbours(position: Position): PositionResult[][] {
    const neighbours = this.getInRectangle(position.x - 1, position.y - 1, 3, 3)

    return [
      neighbours.filter(pos => pos.x === position.x + 0 && pos.y === position.y + 1),
      neighbours.filter(pos => pos.x === position.x + 1 && pos.y === position.y + 0),
      neighbours.filter(pos => pos.x === position.x + 0 && pos.y === position.y - 1),
      neighbours.filter(pos => pos.x === position.x - 1 && pos.y === position.y + 0),
    ]
  }
}

export default PositionMap
