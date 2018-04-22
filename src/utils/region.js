import { ZONE_SIZE } from './zone'

class Region {
  constructor(entities = []) {
    this.entities = entities
  }

  findEdges() {
    const edges = []

    for (let i = 0; i < this.entities.length; i += 1) {
      const { x, y, blocked } = this.entities[i]

      // eslint-disable-next-line no-continue
      if (blocked) continue

      if (x === 0 || x === (ZONE_SIZE - 1)) {
        edges.push({ x, y })
      }

      if (y === 0 || y === (ZONE_SIZE - 1)) {
        edges.push({ x, y })
      }
    }

    return edges
  }
}

export default Region
