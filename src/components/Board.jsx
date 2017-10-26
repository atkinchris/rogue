import React from 'react'

const entities = {
  '1,1': '•',
  '2,2': '•',
  '1,2': '#',
}

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
