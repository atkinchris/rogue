import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Player from './Player'

const Board = ({ entities }) => (
  <div className="board">
    {
      entities.map(({ id, x, y, type }) => {
        const style = {
          transform: `translate(${x}em, ${y}em)`,
        }

        return (
          <div key={id} style={style} className="entity">{ type }</div>
        )
      })
    }
    <Player />
  </div>
)

Board.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
  })).isRequired,
}

const mapStateToProps = state => ({
  entities: state.entities,
})

export default connect(mapStateToProps)(Board)
