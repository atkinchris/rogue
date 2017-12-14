import arraysIntersect from '../arraysIntersect'

describe('arraysIntersect', () => {
  it('finds the intersection of multiple arrays', () => {
    const arrays = [
      ['a', 'c', 'd', 'e', 'f'],
      ['b', 'a', 'c', 'e'],
      ['d', 'a', 'c', 'e', 'b', 'z'],
    ]
    const intersection = arraysIntersect(arrays)

    expect(intersection).toEqual(['a', 'c', 'e'])
  })
})
