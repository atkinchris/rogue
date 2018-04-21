class EdgeBuilder {
  constructor() {
    this.edges = []
    this.currentEdge = []
  }

  addPoint(x, y) {
    this.currentEdge.push({ x, y })
  }

  endEdge() {
    if (this.currentEdge.length === 0) return

    const direction = this.currentEdge[0].x === this.currentEdge[this.currentEdge.length - 1].x
      ? 'vertical'
      : 'horizontal'
    const { length, 0: { x, y } } = this.currentEdge

    this.edges.push({ x, y, length, direction })
    this.currentEdge = []
  }

  getEdges() {
    this.endEdge()
    return this.edges
  }

  getEdgeHashes() {
    return this.getEdges().map(EdgeBuilder.toHash)
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
