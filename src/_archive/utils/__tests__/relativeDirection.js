import relativeDirection from '../relativeDirection'

describe('relativeDirection', () => {
  it('returns the relative direction between two points', () => {
    expect(relativeDirection({ x: 0, y: 0 }, { x: -1, y: 0 })).toBe('left')
    expect(relativeDirection({ x: 0, y: 0 }, { x: 1, y: 0 })).toBe('right')
    expect(relativeDirection({ x: 0, y: 0 }, { x: 0, y: 1 })).toBe('down')
    expect(relativeDirection({ x: 0, y: 0 }, { x: 0, y: -1 })).toBe('up')
  })

  it('returns "none" if the positions are the same', () => {
    expect(relativeDirection({ x: 0, y: 0 }, { x: 0, y: 0 })).toBe('none')
  })
})
