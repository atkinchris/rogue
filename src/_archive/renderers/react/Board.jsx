import React from 'react'
import PropTypes from 'prop-types'

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
    {entities.map(({ id, type, tile, position, visibility }) => {
      if (!tile) {
        throw Error(`Undefined tile - is "${type}" in the tile map?`)
      }
      const { x, y } = position
      const { character, layer = 0 } = tile
      const style = {
        transform: `translate(${toWorld(x)}, ${toWorld(y)})`,
        zIndex: layer,
      }
      const className = `entity e-${type} ${visibility}`

      return (
        <div key={id} style={style} className={className}>
          <span className="entity__character">{character}</span>
        </div>
      )
    })}
  </div>
)

Board.propTypes = {
  entities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.string,
      position: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
      visibility: PropTypes.string.isRequired,
    })
  ).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

export default Board
