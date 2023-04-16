import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App page-container">
      <div className='content-wrap'>
        <Header />
        <About />
        <Portfolio />
        <Contact />
      </div>
    </div>
  );
}

export default App;
