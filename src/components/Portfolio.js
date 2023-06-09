import React, { useState } from "react";
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Concha from '../assets/art/concha.png';
import Paleta from '../assets/art/paleta-payaso.png';
import BumpBlue from '../assets/art/bumpBlue.png';
import Fresas from '../assets/art/fresas.png';
import Cake from '../assets/art/cake.jpg';
import Conchita from '../assets/art/conchita.png';

function Portfolio() {
  const [conchaShow, setConchaShow] = useState(false);
  const [paletaShow, setPaletaShow] = useState(false);
  const [fresasShow, setFresasShow] = useState(false);
  const [bumpBlueShow, setBumpBlueShow] = useState(false);
  const [cakeShow, setCakeShow] = useState(false);
  const [conchitaShow, setConchitaShow] = useState(false);

  return (
    <div id="portfolio">
      <div className="art-section">
        <img src={Concha} alt="" className="art art-dimensions box-shadow" onClick={() => setConchaShow(true)}/>
        <img src={Paleta} alt="" className="art art-dimensions box-shadow" onClick={() => setPaletaShow(true)}/>
        <img src={Fresas} alt="" className="art art-dimensions box-shadow" onClick={() => setFresasShow(true)}/>
        <img src={BumpBlue} alt="" className="art art-dimensions box-shadow" onClick={() => setBumpBlueShow(true)}/>
        <img src={Cake} alt="" className="art art-dimensions box-shadow" onClick={() => setCakeShow(true)}/>
        <img src={Conchita} alt="" className="art art-dimensions box-shadow" onClick={() => setConchitaShow(true)}/>
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
      <Modal className="art-modals" size="lg" show={bumpBlueShow} onHide={() => setBumpBlueShow(false)} aria-labelledby="example-modal-sizes-title-lg" centered>
        <img src={BumpBlue}/>
      </Modal>
      <Modal className="art-modals" size="lg" show={cakeShow} onHide={() => setCakeShow(false)} aria-labelledby="example-modal-sizes-title-lg" centered>
        <img src={Cake}/>
      </Modal>
      <Modal className="art-modals" size="lg" show={conchitaShow} onHide={() => setConchitaShow(false)} aria-labelledby="example-modal-sizes-title-lg" centered>
        <img src={Conchita}/>
      </Modal>
    </div>
  )
}

export default Portfolio;