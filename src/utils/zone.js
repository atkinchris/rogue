const ZONE_SIZE = 14

class Zone {
  constructor() {
    this.positions = {}

    for (let y = 0; y < ZONE_SIZE; y += 1) {
      for (let x = 0; x < ZONE_SIZE; x += 1) {
        this.positions[Zone.toHash(x, y)] = {
          blocked: false,
          region: null,
          x,
          y,
        }
      }
    }

    this.resetRegions()
    this.rebuildRegions()
  }

  flood(x, y, region) {
    const hash = Zone.toHash(x, y)
    if (hash === null) return

    const node = this.positions[hash]
    if (!node || node.blocked || node.region) return

    this.regions[region].push(node)

    node.region = region
    this.flood(x - 1, y, region)
    this.flood(x + 1, y, region)
    this.flood(x, y + 1, region)
    this.flood(x, y - 1, region)
  }

  setBlocked(x, y, blocked) {
    const hash = Zone.toHash(x, y)
    if (hash === null) return

    const node = this.positions[hash]
    node.blocked = blocked
  }

  getPositions() {
    return Object.values(this.positions)
  }

  getNextFreePosition() {
    return this.getPositions().find(p => !p.region && !p.blocked)
  }

  resetRegions() {
    this.regions = {}
    this.lastRegion = 0
    const positions = this.getPositions()

    for (let index = 0; index < positions.length; index += 1) {
      positions[index].region = null
    }
  }

  rebuildRegions() {
    this.resetRegions()
    let next = this.getNextFreePosition()

    while (next) {
      this.lastRegion += 1
      const region = this.lastRegion
      this.regions[region] = []
      this.flood(next.x, next.y, region)
      next = this.getNextFreePosition()
    }
  }

  getRegions() {
    const regions = {}

    const regionKeys = Object.keys(this.regions)
    for (let index = 0; index < regionKeys.length; index += 1) {
      const key = regionKeys[index]
      regions[key] = this.regions[key].length
    }

    return regions
  }

  static toHash(x, y) {
    if (x < 0 || x >= ZONE_SIZE || y < 0 || y >= ZONE_SIZE) {
      return null
    }

    return (y * ZONE_SIZE) + x
  }
}

export default Zone
