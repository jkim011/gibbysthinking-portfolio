import React, { useState } from "react";
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Concha from '../assets/art/concha.png';
import Paleta from '../assets/art/paleta-payaso.png';
import Bump from '../assets/art/bump.png';
import Fresas from '../assets/art/fresas.png';
import Cake from '../assets/art/cake.jpg';

function Portfolio() {
  const [conchaShow, setConchaShow] = useState(false);
  const [paletaShow, setPaletaShow] = useState(false);
  const [fresasShow, setFresasShow] = useState(false);
  const [bumpShow, setBumpShow] = useState(false);
  const [cakeShow, setCakeShow] = useState(false);


  return (
    <div id="portfolio">
      <div className="art-section">
        <img src={Concha} alt="" className="art art-dimensions box-shadow" onClick={() => setConchaShow(true)}/>
        <img src={Paleta} alt="" className="art art-dimensions box-shadow" onClick={() => setPaletaShow(true)}/>
        <img src={Fresas} alt="" className="art art-dimensions box-shadow" onClick={() => setFresasShow(true)}/>
        <img src={Bump} alt="" className="art art-dimensions box-shadow" onClick={() => setBumpShow(true)}/>
        <img src={Cake} alt="" className="art art-dimensions box-shadow" onClick={() => setCakeShow(true)}/>
      </div>
      
      {/* Art modals to show larger image when clicked */}
      <Modal className="art-modals" size="lg" show={conchaShow} onHide={() => setConchaShow(false)} aria-labelledby="example-modal-sizes-title-lg" centered>
        <img src={Concha}/>
      </Modal>
      <Modal className="art-modals" size="lg" show={paletaShow} onHide={() => setPaletaShow(false)} aria-labelledby="example-modal-sizes-title-lg" centered>
        <img src={Paleta}/>
      </Modal>
      <Modal className="art-modals" size="lg" show={fresasShow} onHide={() => setFresasShow(false)} aria-labelledby="example-modal-sizes-title-lg" centered>
        <img src={Fresas}/>
      </Modal>
      <Modal className="art-modals" size="lg" show={bumpShow} onHide={() => setBumpShow(false)} aria-labelledby="example-modal-sizes-title-lg" centered>
        <img src={Bump}/>
      </Modal>
      <Modal className="art-modals" size="lg" show={cakeShow} onHide={() => setCakeShow(false)} aria-labelledby="example-modal-sizes-title-lg" centered>
        <img src={Cake}/>
      </Modal>
    </div>
  )
}

export default Portfolio;