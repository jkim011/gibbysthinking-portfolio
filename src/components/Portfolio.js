import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';

import Concha from '../assets/art/concha.png';
import Paleta from '../assets/art/paleta-payaso.png';
import BumpBlue from '../assets/art/bumpBlue.png';
import Fresas from '../assets/art/fresas.png';
import Cake from '../assets/art/cake.jpg';
import Conchita from '../assets/art/conchita.png';
import FruitSando from '../assets/art/fruit-sando.png';
import CroissantMantaRay from '../assets/art/croissant-manta-ray.png';

const artworks = [
  { name: 'Concha', src: Concha },
  { name: 'Paleta', src: Paleta },
  { name: 'Fresas', src: Fresas },
  { name: 'BumpBlue', src: BumpBlue },
  { name: 'Cake', src: Cake },
  { name: 'Conchita', src: Conchita },
  { name: 'FruitSando', src: FruitSando },
  { name: 'CroissantMantaRay', src: CroissantMantaRay },
];

function Portfolio() {
  const [showModal, setShowModal] = useState({});

  const toggleModal = (artworkName) => {
    setShowModal((prevShowModal) => ({
      ...prevShowModal,
      [artworkName]: !prevShowModal[artworkName],
    }));
  };

  return (
    <div id="portfolio">
      <div className="art-section">
        {artworks.map((artwork) => 
          <img
            key={artwork.name}
            src={artwork.src}
            alt={artwork.name}
            className="art art-dimensions box-shadow"
            onClick={() => toggleModal(artwork.name)}
          />
          )}
      </div>

      {artworks.map((artwork) => 
        <Modal
          key={artwork.name}
          className="art-modals"
          size="lg"
          show={showModal[artwork.name]}
          onHide={() => toggleModal(artwork.name)}
          aria-labelledby="example-modal-sizes-title-lg"
          centered
        >
          <img src={artwork.src} alt={artwork.name} />
        </Modal>
      )}
    </div>
  );
}

export default Portfolio;