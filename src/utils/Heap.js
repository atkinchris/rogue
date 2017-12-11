class Heap {
  constructor(scoreFunction) {
    this.content = []
    this.scoreFunction = scoreFunction
  }

  toArray() {
    return this.content
  }

  push(element) {
    this.content.push(element)
    this.sinkDown(this.content.length - 1)
  }

  pop() {
    const result = this.content[0]
    const end = this.content.pop()

    if (this.content.length > 0) {
      this.content[0] = end
      this.bubbleUp(0)
    }

    return result
  }

  remove(node) {
    const i = this.content.indexOf(node)
    const end = this.content.pop()

    if (i !== this.content.length - 1) {
      this.content[i] = end

      if (this.scoreFunction(end) < this.scoreFunction(node)) {
        this.sinkDown(i)
      } else {
        this.bubbleUp(i)
      }
    }
  }

  size() {
    return this.content.length
  }

  rescoreElement(node) {
    this.sinkDown(this.content.indexOf(node))
  }

  sinkDown(index) {
    let n = index
    const element = this.content[n]

    while (n > 0) {
      const parentN = ((n + 1) >> 1) - 1
      const parent = this.content[parentN]

      if (this.scoreFunction(element) < this.scoreFunction(parent)) {
        this.content[parentN] = element
        this.content[n] = parent
        n = parentN
      } else {
        break
      }
    }
  }

  bubbleUp(index) {
    let n = index
    const { length } = this.content
    const element = this.content[n]
    const elemScore = this.scoreFunction(element)

    while (true) {
      const child2N = (n + 1) << 1
      const child1N = child2N - 1
      let swap = null
      let child1Score

      if (child1N < length) {
        const child1 = this.content[child1N]
        child1Score = this.scoreFunction(child1)

        if (child1Score < elemScore) {
          swap = child1N
        }
      }

      if (child2N < length) {
        const child2 = this.content[child2N]
        const child2Score = this.scoreFunction(child2)
        if (child2Score < (swap === null ? elemScore : child1Score)) {
          swap = child2N
        }
      }

      if (swap !== null) {
        this.content[n] = this.content[swap]
        this.content[swap] = element
        n = swap
      } else {
        break
      }
    }
  }
}

export default Heap
