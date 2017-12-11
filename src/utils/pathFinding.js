/* eslint-disable no-loop-func */
import Heap from './Heap'
import PositionSet from './PositionSet'
import calculateNeighbours from './neighbours'

const MAX_ITERATION = 200

const manhattan = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
const trimNode = ({ x, y }) => ({ x, y })
const isSame = (a, b) => a.x === b.x && a.y === b.y
const pathTo = (node) => {
  let current = node
  const path = []
  while (current.parent) {
    path.push(trimNode(current))
    current = current.parent
  }
  return path.reverse()
}

const calculatePath = (start, end, callback, heuristic = manhattan) => {
  const heap = new Heap(node => node.f)
  const cache = new PositionSet()

  heap.push(start)

  let iteration = 0
  while (heap.size() > 0 && iteration < MAX_ITERATION) {
    iteration += 1
    const currentNode = heap.pop()

    if (isSame(currentNode, end)) {
      return pathTo(currentNode)
    }

    const neighbours = calculateNeighbours(currentNode, callback)

    neighbours.forEach((position) => {
      const neighbour = cache.setOrGetExisting(position)

      if (neighbour.closed || neighbour.blocked) {
        return
      }

      const gScore = (currentNode.g || 0) + neighbour.cost
      const beenVisited = neighbour.visited

      if (!beenVisited || gScore < (neighbour.g || 0)) {
        neighbour.visited = true
        neighbour.parent = currentNode
        neighbour.h = neighbour.h || heuristic(neighbour, end)
        neighbour.g = gScore
        neighbour.f = neighbour.g + neighbour.h

        if (!beenVisited) {
          heap.push(neighbour)
        } else {
          heap.rescoreElement(neighbour)
        }
      }
    })
  }

  return []
}

export default calculatePath
