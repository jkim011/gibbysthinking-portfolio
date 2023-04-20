import React from "react";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

import Concha from '../assets/art/concha.png';
import Paleta from '../assets/art/paleta-payaso.png';
import Bump from '../assets/art/bump.png';
import Fresas from '../assets/art/fresas.png';
import Cake from '../assets/art/cake.png';
import NewCake from '../assets/art/cake.jpg';

function Portfolio() {
  

  return (
    <div id="portfolio">
      <div className="art-section">
        <img src={Concha} className="art-dimensions box-shadow" />
        <img src={Paleta} className="art-dimensions box-shadow" />
        <img src={Fresas} className="art-dimensions box-shadow" />
        <img src={Bump} className="art-dimensions box-shadow" />
        <img src={NewCake} className="art-dimensions box-shadow" />
      </div>
      <>
      

    </>
    </div>
  )
}

export default Portfolio;