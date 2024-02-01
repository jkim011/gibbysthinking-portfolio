import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function Portfolio() {
  const [showModal, setShowModal] = useState({});

  const [image, setImage] = useState();
  const [allImages, setAllImages] = useState();

  useEffect(() => {
    getImage();
  },[])
  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post(
      "http://localhost:3001/upload",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
  }

  const handleChange = (e) => {
    const selectedImages = e.target.files[0];
    console.log(selectedImages, "files from handle change")
    setImage(selectedImages);
  }

  const getImage = async () => {
    const result = await axios.get("http://localhost:3001/get-image");
    console.log(result)
    setAllImages(result.data.data);
  }

  const toggleModal = (artworkName) => {
    setShowModal((prevShowModal) => ({
      ...prevShowModal,
      [artworkName]: !prevShowModal[artworkName],
    }));
  };

  return (
    <div id="portfolio">
      <h3>Add Artwork:</h3>
      <form onSubmit={submitImage}>
        <input type="file" onChange={handleChange} multiple />
        <button>Upload</button>
      </form>
      
      <div>
        <div className="art-section">
          {allImages == null 
            ? "" 
            : allImages.map((data) => {
              return <img 
                        src={require(`../assets/art/${data.image}`)}
                        className="art art-dimensions box-shadow"
                        onClick={() => toggleModal(data.id)}
                      />
            })}
        </div>
        
        {allImages == null 
          ? "" 
          : allImages.map((data) => {
            return <Modal
                      key={data.id}
                      className="art-modals"
                      size="lg"
                      show={showModal[data.id]}
                      onHide={() => toggleModal(data.id)}
                      aria-labelledby="example-modal-sizes-title-lg"
                      centered
                    >
                      <img src={require(`../assets/art/${data.image}`)} alt={data.id} />
                    </Modal>
          })}
      </div>
    </div>
  );
}

export default Portfolio;