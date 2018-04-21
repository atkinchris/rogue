class EdgeBuilder {
  constructor() {
    this.edges = []
    this.currentEdge = []
  }

  addPoint(x, y, region) {
    this.currentEdge.push({ x, y, region })
  }

  endEdge() {
    if (this.currentEdge.length === 0) return

    const direction = this.currentEdge[0].x === this.currentEdge[this.currentEdge.length - 1].x
      ? 'vertical'
      : 'horizontal'
    const { length, 0: { x, y, region } } = this.currentEdge

    this.edges.push({ x, y, length, direction, region })
    this.currentEdge = []
  }

  getEdges() {
    this.endEdge()
    return this.edges
  }

  getEdgeHashes() {
    const output = {}
    const edges = this.getEdges()

    for (let i = 0; i < edges.length; i += 1) {
      const edge = edges[i]
      const hash = EdgeBuilder.toHash(edge)
      output[hash] = edge.region
    }

    return output
  }

  static toHash({ x, y, length, direction }) {
    const padX = String(x).padStart(4, 0)
    const padY = String(y).padStart(4, 0)
    const padLength = String(length).padStart(3, 0)
    const directionBit = direction === 'vertical' ? 1 : 0

    return `${padX}${padY}${padLength}${directionBit}`
  }
}

export default EdgeBuilder
