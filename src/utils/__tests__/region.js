import Region from '../region'

const mapToEntities = (map) => {
  const entities = []

  for (let y = 0; y < map.length; y += 1) {
    const row = map[y]

    for (let x = 0; x < row.length; x += 1) {
      const cell = row[x]

      if (cell === 0) {
        entities.push({ x, y })
      }
    }
  }

  return entities
}

describe('Region', () => {
  it("find all of it's edges", () => {
    const entities = mapToEntities([
      [0, 0, 1, 1, 1, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ])
    const region = new Region(entities)

    const edges = region.findEdges()

    expect(edges).toEqual([
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 5, y: 0 },
      { x: 6, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
    ])
  })
})
