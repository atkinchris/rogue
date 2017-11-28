import posToString from '../posToString'

describe('posToString', () => {
  it('converts a position to a string', () => {
    const position = { x: 3, y: 7 }
    const string = posToString(position)

    expect(string).toBe('3,7')
  })
})
