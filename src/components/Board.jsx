import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Board = ({ entities }) => (
  <div className="board">
    {
      entities.map(({ id, x, y, type }) => {
        const style = {
          textAlign: 'center',
          width: '1em',
          height: '1em',
          position: 'absolute',
          transform: `translate(${x}em, ${y}em)`,
        }

        return (
          <div key={id} style={style}>{ type }</div>
        )
      })
    }
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
