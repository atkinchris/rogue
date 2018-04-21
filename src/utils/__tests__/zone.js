import Zone from '../zone'

describe('Zone', () => {
  it('builds regions of contiguous open positions', () => {
    const zone = new Zone()
    const regions = zone.getRegions()

    expect(regions).toEqual({
      1: 196,
    })
  })

  it('creates a single region for a contiguous area', () => {
    const zone = new Zone()

    for (let x = 0; x < 12; x += 1) {
      zone.setBlocked(x, 6, true)
    }
    zone.rebuildRegions()

    const regions = zone.getRegions()
    expect(regions).toEqual({
      1: 184,
    })
  })

  it('creates a two regions for a bisected area', () => {
    const zone = new Zone()

    for (let x = 0; x < 14; x += 1) {
      zone.setBlocked(x, 6, true)
    }
    zone.rebuildRegions()

    const regions = zone.getRegions()
    expect(regions).toEqual({
      1: 84,
      2: 98,
    })
  })

  it('rebuilds regions when blocked areas change', () => {
    const zone = new Zone()
    expect(zone.getRegions()).toEqual({
      1: 196,
    })

    for (let x = 0; x < 14; x += 1) {
      zone.setBlocked(x, 6, true)
    }
    zone.rebuildRegions()

    expect(zone.getRegions()).toEqual({
      1: 84,
      2: 98,
    })
  })

  it('identifies continuous edges for the zone', () => {
    const zone = new Zone()

    expect(zone.getEdges()).toEqual({
      '000000000140': 1,
      '000000130140': 1,
      '000000000141': 1,
      '001300000141': 1,
    })
  })
})
