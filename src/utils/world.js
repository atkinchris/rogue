import Zone, { ZONE_SIZE } from './zone'
import EdgeBuilder from './edgeBuilder'

class World {
  constructor() {
    this.zones = {}
    this.regionsByEdge = {}
    this.edgesByRegion = {}
  }

  addZone(x, y) {
    const hash = World.zoneHash(x, y)
    const zone = new Zone(hash)

    this.zones[hash] = zone
  }

  buildEdges(zoneHash) {
    const builder = new EdgeBuilder()
    const { x: zX, y: zY } = this.zones[zoneHash]
    let lastPoint

    const buildEdge = (x, y) => {
      const a = this.getPosition(x, y)

      if (!(lastPoint && lastPoint.blocked) && !a.blocked) {
        builder.addPoint(a.x, a.y, a.region)
      }

      if (a.blocked) {
        builder.endEdge()
      }

      lastPoint = a
    }

    lastPoint = null
    for (let x = zX; x < zX + ZONE_SIZE; x += 1) buildEdge(x, 0)
    builder.endEdge()

    lastPoint = null
    for (let x = zX; x < zX + ZONE_SIZE; x += 1) buildEdge(x, ZONE_SIZE - 1)
    builder.endEdge()

    lastPoint = null
    for (let y = zY; y < zY + ZONE_SIZE; y += 1) buildEdge(0, y)
    builder.endEdge()

    lastPoint = null
    for (let y = zY; y < zY + ZONE_SIZE; y += 1) buildEdge(ZONE_SIZE - 1, y)
    builder.endEdge()

    const edges = builder.getEdgeHashes()

    for (let e = 0; e < edges.length; e += 1) {
      const { hash, region } = edges[e]

      const edge = this.regionsByEdge[hash] || {}
      edge[region] = true
      this.regionsByEdge[hash] = edge
    }
  }

  getPosition(x, y) {
    const zX = Math.floor(x / ZONE_SIZE)
    const zY = Math.floor(y / ZONE_SIZE)
    const zoneHash = World.zoneHash(zX, zY)
    const zone = this.zones[zoneHash]

    if (!zone) {
      return null
    }

    return zone.getPosition(x % ZONE_SIZE, y % ZONE_SIZE)
  }

  static zoneHash(x, y) {
    return `${String(x).padStart(4, 0)}${String(y).padStart(4, 0)}`
  }

  static zoneHashToPoints(hash) {
    return {
      x: Number.parseInt(hash.slice(0, 4), 10),
      y: Number.parseInt(hash.slice(5, 8), 10),
    }
  }
}

export default World
