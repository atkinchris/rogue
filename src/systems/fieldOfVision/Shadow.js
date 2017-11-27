class Shadow {
  constructor(start, end) {
    this.start = start
    this.end = end
  }

  contains(other) {
    return this.start <= other.start && this.end >= other.end
  }
}

export default Shadow
