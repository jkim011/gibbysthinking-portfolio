import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Auth from '../utils/auth';

function Portfolio() {
  const [showModal, setShowModal] = useState({});
  const [showDelete, setShowDelete] = useState(false)
  const handleClose = () => setShowDelete(false);
  const handleShow = () => setShowDelete(true);

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
    setImage(selectedImages);
  }

  const getImage = async () => {
    const result = await axios.get("/api/image/get-image");
    setAllImages(result.data.data);
  }

  const toggleModal = (artworkName) => {
    setShowModal((prevShowModal) => ({
      ...prevShowModal,
      [artworkName]: !prevShowModal[artworkName],
    }));
  };

  // For drag and drop
  const handleDragStart = (index) => (e) => {
    e.dataTransfer.setData("index", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => (e) => {
    e.preventDefault();
    const dragIndex = e.dataTransfer.getData("index");
    const newImages = [...allImages];
    const dragImage = newImages[dragIndex];
    newImages.splice(dragIndex, 1);
    newImages.splice(index, 0, dragImage);
    setAllImages(newImages);
    saveNewOrder(newImages);
  };

  const saveNewOrder = async (newImages) => {
    const imageOrder = newImages.map(image => image._id);
    console.log(imageOrder, "saveNewOrder")
    try {
      await axios.post(
        "/api/image/save-order",
        { imageOrder },
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error saving new order:", error);
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      await axios.delete(
        `/api/image/delete-image/${id}`,
      )
      getImage()
    } catch (error) {
      console.error("Error deleting image", error);
    }
  }
  
  if(!Auth.loggedIn() ) { 
    return (
      <div id="portfolio">      
        <div>
          <div className="art-section">
            {allImages == null ? "" 
              : 
                allImages.map((data, index) => {
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
    )
  } else {
    const adminLoggedIn = () => {
      const user = Auth.getProfile().data
      if(user.isAdmin === true) {
        return true
      } else if(user.isAdmin === false) {
        return false
      }
    }
    const adminIsLoggedIn = adminLoggedIn();
  
    return (
      <div id="portfolio">
        {adminIsLoggedIn == true ? (
          <div id="image-form">
            <h3>Add Artwork:</h3>
            <form onSubmit={submitImage}>
              <input type="file" onChange={handleChange} multiple />
              <button className="button-submit">Upload</button>
            </form>
          </div>
        ) : (
          <div></div>
        )} 
              
        <div>
          <div className="art-section ">
            {allImages == null ? ""
              : 
              allImages.map((data, index) => {
              return (
                <div className="position-relative d-inline-block">
                  <img 
                    key={index}
                    src={require(`../assets/art/${data.image}`)}
                    alt={index}
                    className="art art-dimensions box-shadow"
                    onClick={() => toggleModal(index)}
                    draggable 
                    onDragStart={handleDragStart(index)} 
                    onDragOver={handleDragOver} 
                    onDrop={handleDrop(index)} 
                  />
                  {adminIsLoggedIn && (
                    <button className="position-absolute bottom-0 end-0 m-2 m-md-4" onClick={handleShow}>Delete</button>
                  )}
                  <Modal show={showDelete} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this image?</Modal.Body>
                    <Modal.Footer>
                      <button variant="secondary" onClick={handleClose}>
                        Cancel
                      </button>
                      <button variant="primary" onClick={() => handleDeleteImage(data._id)}>
                        Yes
                      </button>
                    </Modal.Footer>
                  </Modal>
                </div>
              );
            })
          }
          </div>
        </div>
      </div>
    );
  }
}

export default Portfolio;