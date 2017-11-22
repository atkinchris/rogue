import React from 'react'
import PropTypes from 'prop-types'

const Board = ({ entities }) => (
  <div className="board">
    {
      entities.map(({ id, x, y, layer = 0, character }) => {
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
    character: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    layer: PropTypes.number,
  })).isRequired,
}

export default Board
