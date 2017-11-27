import React from 'react'
import PropTypes from 'prop-types'

import posToString from '../../utils/posToString'
import tiles from './tiles'

import './entities.css'

const Board = ({ entities, vision }) => (
  <div className="board">
    {
      entities.map(({ id, type, position }) => {
        const { x, y } = position
        const { character, layer = 0 } = tiles[type]
        const style = {
          transform: `translate(${x}em, ${y}em)`,
          zIndex: layer,
        }
        let className = `entity e-${type}`

        if (vision[posToString(position)]) {
          className += ' visible'
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
