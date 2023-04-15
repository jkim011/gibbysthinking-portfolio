import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';

function App() {
  return (
    <div className="App page-container">
      <div className='content-wrap'>
        <Header />
      </div>
    </div>
  );
}

export default App;
