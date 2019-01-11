import { createPlayer, createTile, createWall } from '.'

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

const buildMap = world => {
  let player

  MAP.forEach((row, y) => {
    row.split('').forEach((cell, x) => {
      const position = { x, y }

      switch (cell) {
        case '@': {
          player = createPlayer(world, position)
          createTile(world, position)
          break
        }
        case '"':
          createTile(world, position)
          // createUndergrowth(store, position)
          break
        case '#':
          createWall(world, position)
          break
        case '+':
          // createDoor(store, position)
          createTile(world, position)
          break
        case '.':
          createTile(world, position)
          break
        case 'k':
          // createMonster(store, position)
          createTile(world, position)
          break
        default:
          break
      }
    })
  })

  return player
}

export default buildMap
