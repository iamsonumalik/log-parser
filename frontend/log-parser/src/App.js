// src/App.js

import React from 'react';
import LogParser from './components/LogParserApp';

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <h1>Log Parser App</h1>
          <LogParser />
        </header>
      </div>
  );
}

export default App;
