import {
  createPlayer,
  createMonster,
  createWall,
  createDoor,
  createFloor,
  createUndergrowth,
} from './'

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

const buildMap = ({ store }) => {
  let player

  MAP.forEach((row, y) => {
    row.split('').forEach((cell, x) => {
      const position = { x, y }

      switch (cell) {
        case '@': {
          player = createPlayer(store, position)
          createFloor(store, position)
          break
        }
        case '"':
          createUndergrowth(store, position)
          break
        case '#':
          createWall(store, position)
          break
        case '+':
          createDoor(store, position)
          break
        case '.':
          createFloor(store, position)
          break
        case 'k':
          createMonster(store, position)
          createFloor(store, position)
          break
        default:
          break
      }
    })
  })

  return player
}

export default buildMap
