import React from 'react'
import PropTypes from 'prop-types'

import tiles from './tiles'

import './entities.css'

const Board = ({ entities }) => (
  <div className="board">
    {
      entities.map(({ id, type, position, visible, seen }) => {
        const { x, y } = position
        const { character, layer = 0 } = tiles[type]
        const style = {
          transform: `translate(${x}em, ${y}em)`,
          zIndex: layer,
        }
        let className = `entity e-${type}`

        if (visible) {
          className += ' visible'
        }

        if (seen) {
          className += ' seen'
        }

        return (
          <div key={id} style={style} className={className}>
            <span className="entity__character">{ character }</span>
          </div>
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
  vision: PropTypes.shape({}).isRequired,
}

export default Board
