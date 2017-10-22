import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

const entities = {
  '10.10': '•',
  '11.11': '•',
  '10.11': '#'
}

const Board = () => (
  <div>
    {
      Object.keys(entities).map(key => {
        const [x, y] = key.split('.')
        const style = {
          textAlign: 'center',
          width: '1em',
          height: '1em',
          position: 'absolute',
          transform: `translate(${x}em, ${y}em)`
        }

        return (
          <div key={key} style={style}>{ entities[key] }</div>
        )
      })
    }
  </div>
)

ReactDOM.render(
  <Board />,
  document.getElementById('root')
);
