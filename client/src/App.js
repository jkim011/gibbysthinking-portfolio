import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './page-sections/Header';
import About from './page-sections/About';
import Portfolio from './page-sections/Portfolio';
import Contact from './page-sections/Contact';
import Footer from './page-sections/Footer';

function App() {
  return (
    <div className="App page-container">
      <div className='content-wrap'>
        <Header />
        <About />
        <Portfolio />
        
      </div>
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
