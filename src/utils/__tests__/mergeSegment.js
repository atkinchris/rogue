import mergeSegment from '../mergeSegment'

describe('mergeSegment', () => {
  it('adds a segment', () => {
    const segments = []
    const segment = { start: 0.4, end: 0.5 }
    const output = mergeSegment(segments, segment)

    expect(output).toEqual([
      { start: 0.4, end: 0.5 },
    ])
  })

  it('adds a non-overlapping segment in the right order', () => {
    const segments = [
      { start: 0, end: 0.3 },
      { start: 0.6, end: 0.9 },
    ]
    const segment = { start: 0.4, end: 0.5 }
    const output = mergeSegment(segments, segment)

    expect(output).toEqual([
      { start: 0, end: 0.3 },
      { start: 0.4, end: 0.5 },
      { start: 0.6, end: 0.9 },
    ])
  })

  it('merges overlapping segments', () => {
    const segments = [
      { start: 0, end: 0.3 },
      { start: 0.6, end: 0.9 },
    ]
    const segment = { start: 0.2, end: 0.4 }
    const output = mergeSegment(segments, segment)

    expect(output).toEqual([
      { start: 0, end: 0.4 },
      { start: 0.6, end: 0.9 },
    ])
  })

  it('merges multiple overlapping segments', () => {
    const segments = [
      { start: 0, end: 0.3 },
      { start: 0.6, end: 0.9 },
    ]
    const segment = { start: 0.2, end: 0.7 }
    const output = mergeSegment(segments, segment)

    expect(output).toEqual([
      { start: 0, end: 0.9 },
    ])
  })

  it('merges touching segments', () => {
    const segments = [
      { start: 0, end: 0.3 },
      { start: 0.6, end: 0.9 },
    ]
    const segment = { start: 0.3, end: 0.4 }
    const output = mergeSegment(segments, segment)

    expect(output).toEqual([
      { start: 0, end: 0.4 },
      { start: 0.6, end: 0.9 },
    ])
  })

  it('merges multiple touching segments', () => {
    const segments = [
      { start: 0, end: 0.3 },
      { start: 0.6, end: 0.9 },
    ]
    const segment = { start: 0.3, end: 0.6 }
    const output = mergeSegment(segments, segment)

    expect(output).toEqual([
      { start: 0, end: 0.9 },
    ])
  })

  it('does not merge segments that are entirely overlapped', () => {
    const segments = [
      { start: 0, end: 0.3 },
      { start: 0.6, end: 0.9 },
    ]
    const segment = { start: 0.1, end: 0.2 }
    const output = mergeSegment(segments, segment)

    expect(output).toEqual([
      { start: 0, end: 0.3 },
      { start: 0.6, end: 0.9 },
    ])
  })

  it('does not merge segments that are entirely overlapped and touching', () => {
    const segments = [
      { start: 0, end: 0.3 },
      { start: 0.6, end: 0.9 },
    ]
    const segment = { start: 0.0, end: 0.3 }
    const output = mergeSegment(segments, segment)

    expect(output).toEqual([
      { start: 0, end: 0.3 },
      { start: 0.6, end: 0.9 },
    ])
  })

  describe('real scenarios', () => {
    it('real scenario 1', () => {
      const segments = []
      const segment = { start: 0, end: 0.3333333333333333 }

      expect(mergeSegment(segments, segment)).toEqual([
        { start: 0, end: 0.3333333333333333 },
      ])
    })

    it('real scenario 2', () => {
      const segments = [
        { start: 0, end: 0.3333333333333333 },
      ]
      const segment = { start: 0.25, end: 0.6666666666666666 }

      expect(mergeSegment(segments, segment)).toEqual([
        { start: 0, end: 0.6666666666666666 },
      ])
    })

    it('real scenario 3', () => {
      const segments = [
        { start: 0, end: 0.3333333333333333 },
      ]
      const segment = { start: 0.5, end: 1 }

      expect(mergeSegment(segments, segment)).toEqual([
        { start: 0, end: 0.3333333333333333 },
        { start: 0.5, end: 1 },
      ])
    })
  })
})
