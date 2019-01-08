import invert from '../invert'

describe('invert', () => {
  it('swaps an objects keys and values', () => {
    const object = {
      0: 'a',
      1: 'b',
      2: 'c',
      4: 'd',
      8: 'e',
      16: 'f',
    }
    const inverted = {
      a: '0',
      b: '1',
      c: '2',
      d: '4',
      e: '8',
      f: '16',
    }

    expect(invert(object)).toEqual(inverted)
  })
})
