import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

//////////// TODO: add user model for login and put conditions on submitImage
////////////       find a way for mongodb data to be rearranged incase art work needs to be switched around
////////////       add delete function for data 
////////////       add contact section 

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
      "/api/image/upload-image",
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
    const result = await axios.get("/api/image/get-image");
    console.log(result, "getImage")
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
            : allImages.map((data, index) => {
              return <img 
                        key={index}
                        src={require(`../assets/art/${data.image}`)}
                        alt={index}
                        className="art art-dimensions box-shadow"
                        onClick={() => toggleModal(index)}
                      />
            })}
        </div>
        
        {allImages == null 
          ? "" 
          : allImages.map((data, index) => {
            return <Modal
                      key={index}
                      className="art-modals"
                      size="lg"
                      show={showModal[index]}
                      onHide={() => toggleModal(index)}
                      aria-labelledby="example-modal-sizes-title-lg"
                      centered
                    >
                      <img src={require(`../assets/art/${data.image}`)} alt={index} />
                    </Modal>
          })}
      </div>
    </div>
  );
}

export default Portfolio;