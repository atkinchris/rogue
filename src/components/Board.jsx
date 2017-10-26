import React from 'react'

const board = [
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', '@', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
]

const entities = board.reduce((out, row, y) => ({
  ...out,
  ...row.reduce((rowOut, cell, x) => ({
    ...rowOut,
    [`${x},${y}`]: cell,
  }), {}),
}), {})

const Board = () => (
  <div className="board">
    {
      Object.keys(entities).map((key) => {
        const [x, y] = key.split(',')
        const style = {
          textAlign: 'center',
          width: '1em',
          height: '1em',
          position: 'absolute',
          // top: `${y}em`,
          // left: `${x}em`,
          transform: `translate(${x}em, ${y}em)`,
        }

        return (
          <div key={key} style={style}>{ entities[key] }</div>
        )
      })
    }
  </div>
)

export default Board
