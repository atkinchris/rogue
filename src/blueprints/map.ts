import { createPlayer, createGrass, createWall } from '.'
import World from '../types/world'

const MAP = [
  ' ###############',
  ' #.............#',
  ' #+###########+####',
  ' #.......#........#',
  ' #...k...#........#',
  ' #.......+........#',
  ' #.......#........#',
  ' #.......#........#',
  ' ###+#########+####',
  '##.......#####.#',
  '#...@....#####.#',
  '#........##k...#',
  '#."""""..#####.#',
  '##"""""""#####.#',
  ' #""""""..k....#',
  ' ###############',
]

const buildMap = (world: World) => {
  let player

  MAP.forEach((row, y) => {
    row.split('').forEach((cell, x) => {
      const position = { x, y }

      switch (cell) {
        case '@': {
          player = createPlayer(world, position)
          createGrass(world, position)
          break
        }
        case '"':
          createGrass(world, position)
          // createUndergrowth(store, position)
          break
        case '#':
          createWall(world, position)
          break
        case '+':
          // createDoor(store, position)
          createGrass(world, position)
          break
        case '.':
          createGrass(world, position)
          break
        case 'k':
          // createMonster(store, position)
          createGrass(world, position)
          break
        default:
          break
      }
    })
  })

  return player
}

export default buildMap
