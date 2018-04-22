import EdgeBuilder from '../edgeBuilder'

describe('EdgeBuilder', () => {
  it('builds points into an edge', () => {
    const builder = new EdgeBuilder()

    builder.addPoint(0, 0)
    builder.addPoint(1, 0)
    builder.addPoint(2, 0)
    builder.endEdge()

    expect(builder.getEdges()).toEqual([{
      x: 0,
      y: 0,
      direction: 'horizontal',
      length: 3,
    }])
  })

  it('begins a new edge', () => {
    const builder = new EdgeBuilder()

    builder.addPoint(0, 0)
    builder.addPoint(1, 0)
    builder.addPoint(2, 0)
    builder.endEdge()

    builder.addPoint(0, 0)
    builder.addPoint(0, 1)
    builder.addPoint(0, 2)
    builder.addPoint(0, 3)

    expect(builder.getEdges()).toEqual([{
      x: 0,
      y: 0,
      direction: 'horizontal',
      length: 3,
    }, {
      x: 0,
      y: 0,
      direction: 'vertical',
      length: 4,
    }])
  })

  it('supports multiple edges in the same direction', () => {
    const builder = new EdgeBuilder()

    builder.addPoint(0, 0)
    builder.addPoint(1, 0)
    builder.addPoint(2, 0)
    builder.endEdge()

    builder.addPoint(4, 0)
    builder.addPoint(5, 0)
    builder.addPoint(6, 0)

    expect(builder.getEdges()).toEqual([{
      x: 0,
      y: 0,
      direction: 'horizontal',
      length: 3,
    }, {
      x: 4,
      y: 0,
      direction: 'horizontal',
      length: 3,
    }])
  })

  it('hashes edges', () => {
    const builder = new EdgeBuilder()

    builder.addPoint(0, 0, 1)
    builder.addPoint(1, 0)
    builder.addPoint(2, 0)
    builder.endEdge()

    builder.addPoint(0, 0, 1)
    builder.addPoint(0, 1)
    builder.addPoint(0, 2)
    builder.addPoint(0, 3)

    expect(builder.getEdgeHashes()).toEqual([
      { hash: '000000000030', region: 1 },
      { hash: '000000000041', region: 1 },
    ])
  })
})
