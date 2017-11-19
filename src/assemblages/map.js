import { createPlayer, createWall, createFloor } from './'

const MAP = [
  '          ',
  ' ######## ',
  '##......# ',
  '#...@...# ',
  '#.......# ',
  '##......##',
  ' #.......#',
  ' #########',
]

const buildMap = store => MAP.forEach((row, y) => {
  row.split('').forEach((cell, x) => {
    switch (cell) {
      case '@':
        createPlayer(store, { x, y })
        createFloor(store, { x, y })
        break
      case '#':
        createWall(store, { x, y })
        break
      case '.':
        createFloor(store, { x, y })
        break
      default:
        break
    }
  })
})

export default buildMap
