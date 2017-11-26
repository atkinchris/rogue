import {
  createPlayer,
  createMonster,
  createWall,
  createDoor,
  createFloor,
} from './'

const MAP = [
  ' ######## ',
  ' #...k..# ',
  ' #......# ',
  ' #......# ',
  ' ###+#### ',
  '##......# ',
  '#...@...# ',
  '#.......# ',
  '##....k.##',
  ' #.......#',
  ' #########',
]

const buildMap = (store) => {
  let player

  MAP.forEach((row, y) => {
    row.split('').forEach((cell, x) => {
      switch (cell) {
        case '@': {
          player = createPlayer(store, { x, y })
          createFloor(store, { x, y })
          break
        }
        case '#':
          createWall(store, { x, y })
          break
        case '+':
          createDoor(store, { x, y })
          break
        case '.':
          createFloor(store, { x, y })
          break
        case 'k':
          createMonster(store, { x, y })
          createFloor(store, { x, y })
          break
        default:
          break
      }
    })
  })

  return player
}

export default buildMap
