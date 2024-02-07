import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './page-sections/Header';
import About from './page-sections/About';
import Portfolio from './page-sections/Portfolio';
import Contact from './page-sections/Contact';

function App() {
  return (
    <div className="App page-container">
      <div className='content-wrap'>
        <Header />
        <About />
        <Portfolio />
        
      </div>
      <Contact />
    </div>
  );
}

export default App;
