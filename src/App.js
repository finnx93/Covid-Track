import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('/data').then(res => res.json()).then(data => {
        setCount(data["positive"]);
    });
  }, []);

  return (
      <div className="App">
        <header className="App-header">
            <p>Alaska has {count} cases today</p>
        </header>
      </div>
  );
}

export default App;