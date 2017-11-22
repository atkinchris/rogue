import React from 'react'
import PropTypes from 'prop-types'

import tiles from './tiles'

const Board = ({ entities }) => (
  <div className="board">
    {
      entities.map(({ id, type, position: { x, y } }) => {
        const { character, layer = 0 } = tiles[type]
        const style = {
          transform: `translate(${x}em, ${y}em)`,
          zIndex: layer,
        }
        return (
          <div key={id} style={style} className="entity">{ character }</div>
        )
      })
    }
  </div>
)

Board.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  })).isRequired,
}

export default Board
