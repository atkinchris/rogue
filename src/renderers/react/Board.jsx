import React from 'react'
import PropTypes from 'prop-types'

import tiles from './tiles'

import './entities.css'

const toWorld = n => `${n}em`

const Board = ({ entities, width, height }) => (
  <div
    className="board"
    style={{
      width: toWorld(width + 1),
      height: toWorld(height + 1),
    }}
  >
    {
      entities.map(({ id, type, position, visibility }) => {
        const { x, y } = position
        const { character, layer = 0 } = tiles[type]
        const style = {
          transform: `translate(${toWorld(x)}, ${toWorld(y)})`,
          zIndex: layer,
        }
        const className = `entity e-${type} ${visibility}`

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
    visibility: PropTypes.string.isRequired,
  })).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

export default Board
