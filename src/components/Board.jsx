import React from 'react'
import { connect } from 'react-redux'

const Board = ({ entities }) => (
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

const mapStateToProps = state => ({
  entities: state.board,
})

export default connect(mapStateToProps)(Board)
