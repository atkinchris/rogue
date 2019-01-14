import rbush from 'rbush'

import Entity from './entity'

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

  getInRectangle(x: number, y: number, width: number, height: number): [PositionResult] {
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
}

export default PositionMap
