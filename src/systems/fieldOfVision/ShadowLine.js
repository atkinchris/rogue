import mergeSegment from '../../utils/mergeSegment'

class ShadowLine {
  constructor() {
    this.shadows = []
  }

  isFullShadow() {
    return this.shadows.length === 1 && this.shadows[0].start === 0 && this.shadows[0].end === 1
  }

  isInShadow(projection) {
    return this.shadows.some(shadow => shadow.contains(projection))
  }

  add(shadow) {
    this.shadows = mergeSegment(this.shadows, shadow)
  }
}

export default ShadowLine
