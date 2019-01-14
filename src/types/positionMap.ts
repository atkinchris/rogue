import rbush from 'rbush'

import Entity from './entity'
import Position from './position'

interface PositionResult {
  x: number
  y: number
  id: string
}

class PositionMap {
  tree: any

  constructor() {
    this.tree = rbush()
  }

  add(entity: Entity) {
    this.tree.insert({
      minX: entity.position.x,
      maxX: entity.position.x,
      minY: entity.position.y,
      maxY: entity.position.y,
      id: entity.id,
    })
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
