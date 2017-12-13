// https://www.gamasutra.com/blogs/AAdonaac/20150903/252889/Procedural_Dungeon_Generation_Algorithm.php
// http://fisherevans.com/blog/post/dungeon-generation
// https://www.reddit.com/r/gamedev/comments/1dlwc4/procedural_dungeon_generation_algorithm_explained/

import Rect from './Rect'
import buildGrid from './buildGrid'
import verticesToEdges from './verticesToEdges'

const NUMBER_OF_ROOMS = 20
const RADIUS = 10
const MIN_HEIGHT = 3
const MAX_HEIGHT = 12
const MIN_RATIO = 1.5
const MAX_RATIO = 2.8

const normalRand = (approx = 6) => [...Array(approx)].reduce(out => out + Math.random(), 0) / approx
const randBetween = (min, max, rand) => (rand() * (max - (min + 1))) + min

const getRandomPointInCircle = (radius) => {
  const t = 2 * Math.PI * Math.random()
  const u = Math.random() + Math.random()
  const r = u > 1 ? 2 - u : u

  return {
    x: Math.floor(radius * r * Math.cos(t)) + (2 * radius),
    y: Math.floor(radius * r * Math.sin(t)) + (2 * radius),
  }
}

const buildRoom = ({ x, y }) => {
  const ratio = randBetween(MIN_RATIO, MAX_RATIO, normalRand)
  const height = Math.floor(randBetween(MIN_HEIGHT, MAX_HEIGHT, normalRand))
  const width = Math.floor(height * ratio)

  return new Rect({ x, y, height, width })
}

const buildCorridors = (vertices, edges) => {
  const corridors = []

  edges.forEach(([a, b]) => {
    corridors.push([vertices[a], vertices[b]])
  })

  return corridors
}

const separateRooms = (_rooms) => {
  const rooms = [..._rooms]
  const pad = 2
  const MAX_PASSES = rooms.length

  for (let pass = 0; pass < MAX_PASSES; pass += 1) {
    for (let i = 0; i < rooms.length; i += 1) {
      const a = rooms[i]
      for (let j = i + 1; j < rooms.length; j += 1) {
        const b = rooms[j]
        if (a.intersects(b, pad)) {
          let dx = Math.min(a.right - (b.left + pad), a.left - (b.right + pad))
          let dy = Math.min(a.bottom - (b.top + pad), a.top - (b.bottom + pad))

          if (Math.abs(dx) < Math.abs(dy)) {
            dy = 0
          } else {
            dx = 0
          }

          const dxa = -dx / 2
          const dxb = dx + dxa
          const dya = -dy / 2
          const dyb = dy + dya

          a.shift(dxa, dya)
          b.shift(dxb, dyb)
        }
      }
    }
  }

  return rooms
}

const arrayMax = (array, func) => Math.max(...array.map(func))

const generate = () => {
  const radius = RADIUS
  const allRooms = [...Array(NUMBER_OF_ROOMS)]
    .map(() => getRandomPointInCircle(radius))
    .map(buildRoom)

  const rooms = separateRooms(allRooms)
  const bounds = {
    width: arrayMax(rooms, room => room.right),
    height: arrayMax(rooms, room => room.bottom),
  }

  const vertices = rooms.map(room => [room.midX, room.midY])
  const edges = verticesToEdges(vertices)
  const corridors = buildCorridors(vertices, edges)

  return buildGrid({ rooms, bounds, corridors })
}

export default generate
