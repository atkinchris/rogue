import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Player = ({ x, y, type }) => {
  const style = {
    transform: `translate(${x}em, ${y}em)`,
  }

  return (
    <div style={style} className="entity">{ type }</div>
  )
}

Player.propTypes = {
  type: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

const mapStateToProps = state => state.player

export default connect(mapStateToProps)(Player)
