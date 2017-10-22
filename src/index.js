import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

const entities = {
  '0100': '#'
}

const Board = () => (
  <div>
    <h1>{ JSON.stringify(entities) }</h1>
  </div>
)

ReactDOM.render(
  <Board />,
  document.getElementById('root')
);
