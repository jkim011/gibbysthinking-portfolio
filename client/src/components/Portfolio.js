import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

import Concha from '../assets/art/concha.png';
import Paleta from '../assets/art/paleta-payaso.png';
import BumpBlue from '../assets/art/bumpBlue.png';
import Fresas from '../assets/art/fresas.png';
import Cake from '../assets/art/cake.jpg';
import Conchita from '../assets/art/conchita.png';
import FruitSando from '../assets/art/fruit-sando.png';
import CroissantMantaRay from '../assets/art/croissant-manta-ray.png';
import StrawberryFrenchToast from '../assets/art/strawberry-french-toast.png';

const artworks = [
  { name: 'Concha', src: Concha },
  { name: 'Paleta', src: Paleta },
  { name: 'Fresas', src: Fresas },
  { name: 'BumpBlue', src: BumpBlue },
  { name: 'Cake', src: Cake },
  { name: 'Conchita', src: Conchita },
  { name: 'FruitSando', src: FruitSando },
  { name: 'CroissantMantaRay', src: CroissantMantaRay },
  { name: 'StrawberryFrenchToast', src: StrawberryFrenchToast },
];

function Portfolio() {
  const [showModal, setShowModal] = useState({});

  const [files, setFiles] = useState([]);

  const handleAddImageChange = (e) => {
    const selectedFiles = e.target.files;
    const fileUrls = Array.from(selectedFiles).map(file =>
        URL.createObjectURL(file)
    );
    setFiles(prevFiles => [...prevFiles, ...fileUrls]);
  }

  const handleAddImage = async () => {
    const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
          formData.append("images", files[i]);
      }

      try {
          const response = await axios.post("http://localhost:3001/upload", formData);

          console.log(response.data);

          setFiles(response.data);
      } catch (error) {
          console.error("Error uploading images:", error);
      }
  }

  const toggleModal = (artworkName) => {
    setShowModal((prevShowModal) => ({
      ...prevShowModal,
      [artworkName]: !prevShowModal[artworkName],
    }));
  };

  return (
    <div id="portfolio">
      {/* <div className="art-section">
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
      )} */}

      <h2>Add Images:</h2>
      <input type="file" onChange={handleAddImageChange} multiple />
      <button onClick={handleAddImage}>Upload</button>
      
      <div>
        <div className="art-section">
          {files.map((file, index) => (
              <img key={index} src={file} alt={`Image ${index + 1}`} className="art art-dimensions box-shadow" onClick={() => toggleModal(index)}/>
          ))}
        </div>

        {files.map((file, index) => (
          <Modal
            key={index}
            className="art-modals"
            size="lg"
            show={showModal[index]}
            onHide={() => toggleModal(index)}
            aria-labelledby="example-modal-sizes-title-lg"
            centered
          >
            <img src={file} alt={index} />
          </Modal>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;