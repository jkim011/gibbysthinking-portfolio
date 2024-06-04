import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './page-sections/Header';
import About from './page-sections/About';
import Portfolio from './page-sections/Portfolio';
import Contact from './page-sections/Contact';
import Footer from './page-sections/Footer';
import AboutMe from './page-sections/AboutMe';

function App() {
  return (
    <div className="App page-container">
      <Router>
        <div className='content-wrap'>
          <Header />

          <Routes>
            <Route
              path='/'
              element={<><About/><Portfolio/></>}
            />
            {/* <About />
            <Portfolio /> */}
            <Route 
              path='/about-me'
              element={<AboutMe />}
            />
            <Route 
              path='/contact'
              element={<Contact />}
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
