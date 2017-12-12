import { posToString, stringToPos } from '../positions'

describe('positions', () => {
  it('converts a position to a string', () => {
    const position = { x: 3, y: 7 }
    const string = posToString(position)

    expect(string).toBe('3,7')
  })

  it('converts a string to a position', () => {
    const string = '3,7'
    const position = stringToPos(string)

    expect(position).toEqual({ x: 3, y: 7 })
  })
})
