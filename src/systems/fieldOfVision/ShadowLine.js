class ShadowLine {
  constructor() {
    this.shadows = []
  }

  isInShadow(projection) {
    return this.shadows.some(shadow => shadow.contains(projection))
  }

  add(shadow) {
    // Figure out where to slot the new shadow in the list.
    let index = 0
    for (; index < this.shadows.length; index += 1) {
      // Stop when we hit the insertion point.
      if (this.shadows[index].start >= shadow.start) break
    }

    // The new shadow is going here. See if it overlaps the
    // previous or next.
    let overlappingPrevious
    if (index > 0 && this.shadows[index - 1].end > shadow.start) {
      overlappingPrevious = this.shadows[index - 1]
    }

    let overlappingNext
    if (index < this.shadows.length && this.shadows[index].start < shadow.end) {
      overlappingNext = this.shadows[index]
    }

    // Insert and unify with overlapping shadows.
    if (overlappingNext != null) {
      if (overlappingPrevious != null) {
        // Overlaps both, so unify one and delete the other.
        overlappingPrevious.end = overlappingNext.end
        this.shadows.splice(index, 1)
      } else {
        // Overlaps the next one, so unify it with that.
        overlappingNext.start = shadow.start
      }
    } else if (overlappingPrevious != null) {
      // Overlaps the previous one, so unify it with that.
      overlappingPrevious.end = shadow.end
    } else {
      // Does not overlap anything, so insert.
      this.shadows[index] = shadow
    }
  }
}

export default ShadowLine
