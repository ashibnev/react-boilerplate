import React, { useState } from 'react';
import { Header } from './Header.jsx';
import './App.scss';

export const App = () => {
  const [counter, setCounter] = useState(1);

  const increment = () => setCounter(counter + 1);
  return (
    <div className="App">
      <Header />
      <button onClick={increment}>+</button>
      <h1>{counter}</h1>
    </div>
  );
};
