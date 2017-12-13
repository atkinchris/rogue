import { triangulate } from 'delaunay-fast'

const compareEdge = ([aX, aY]) => ([bX, bY]) => aX === bX && aY === bY
const sortEdges = ([aX, aY], [bX, bY]) => aX - bX || aY - bY
const uniqueEdges = (out, edge) => (out.find(compareEdge(edge)) ? out : [...out, edge])

const verticesToEdges = (vertices) => {
  const trianglesRaw = triangulate(vertices)
  const edges = []
  const sortEdge = (a, b) => a > b

  for (let i = 0; i < trianglesRaw.length; i += 3) {
    const a = trianglesRaw[i]
    const b = trianglesRaw[i + 1]
    const c = trianglesRaw[i + 2]

    edges.push([a, b].sort(sortEdge))
    edges.push([b, c].sort(sortEdge))
    edges.push([c, a].sort(sortEdge))
  }

  return edges
    .reduce(uniqueEdges, [])
    .sort(sortEdges)
}

export default verticesToEdges
