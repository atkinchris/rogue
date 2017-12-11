/* eslint-disable no-loop-func */
import Heap from 'heap'

import PositionSet from './PositionSet'
import calculateNeighbours from './neighbours'

const manhattan = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
const trimNode = ({ x, y }) => ({ x, y })

const calculatePath = (start, end, callback, heuristic = manhattan) => {
  const heap = new Heap(node => node.f)
  const cache = new PositionSet()

  heap.push(start)

  while (heap.size() > 0) {
    const currentNode = heap.pop()

    if (currentNode.x === end.x && currentNode.y === end.y) {
      let node = currentNode
      const path = []
      while (node.parent) {
        path.push(trimNode(node))
        node = node.parent
      }
      return path.reverse()
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
          heap.updateItem(neighbour)
        }
      }
    })
  }

  return []
}

export default calculatePath
