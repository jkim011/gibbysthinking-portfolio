import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Auth from '../utils/auth';

function Portfolio() {
  const [showModal, setShowModal] = useState({});
  const [showDelete, setShowDelete] = useState(false)
  const handleClose = () => setShowDelete(false);
  const handleShow = (id) => setShowDelete({ [id]: true});
  
  const [isImageSelected, setIsImageSelected] = useState(false);

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
    setIsImageSelected(true);
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
    if (e.dataTransfer) {
      e.dataTransfer.setData("index", index);

      const clickedImage = e.target;
      const dragImageContainer = document.createElement("div");
      dragImageContainer.style.position = "absolute";
      dragImageContainer.style.left = "-9999px"; 
      document.body.appendChild(dragImageContainer);

      const dragImage = clickedImage.cloneNode(true);
      dragImageContainer.appendChild(dragImage);

      dragImage.style.opacity = "1"; 
      dragImage.style.width = clickedImage.width + "px";
      dragImage.style.height = clickedImage.height + "px";

      const x = dragImage.width / 2;
      const y = dragImage.height / 2;
      e.dataTransfer.setDragImage(dragImageContainer, x, y);
      
      setTimeout(() => {
        document.body.removeChild(dragImageContainer);
      }, 0);
    }
  };

  const handleDragOver = (e) => {
    if (e.dataTransfer) {
      e.preventDefault();
      console.log("touch moving ")

      e.dataTransfer.dropEffect = "move";
    }
  };
  
  const handleDrop = (index) => (e) => {
    e.preventDefault();
    if (e.dataTransfer) {
      const dragIndex = e.dataTransfer.getData("index");
      const newImages = [...allImages];
      const dragImage = newImages[dragIndex];
      newImages.splice(dragIndex, 1);
      newImages.splice(index, 0, dragImage);
      setAllImages(newImages);
      saveNewOrder(newImages);
    }
  };

  // For touch event drag n drop
  let draggedItem = null;
  let draggedItemIndex;
  let originalIndex;
  let touchStartX;
  let touchStartY;
  let originalX;
  let originalY;
  let ghostImageContainer = null;
  let ghostImage = null
  let offsetX = 0;
  let offsetY = 0;
  
  function touchStart(e) {
    draggedItem = e.target;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    originalIndex = Array.from(document.querySelectorAll('.images')).indexOf(draggedItem);
    originalX = draggedItem.offsetLeft;
    originalY = draggedItem.offsetTop;
    
    if(draggedItem) return null
  }

  function createGhostImage() {
    if (!ghostImageContainer) {
      ghostImageContainer = document.createElement("div");
      ghostImageContainer.style.position = "absolute";
      ghostImageContainer.style.pointerEvents = "none";
      ghostImageContainer.style.zIndex = "1000";
      document.body.appendChild(ghostImageContainer);

      ghostImage = draggedItem.cloneNode(true);
      ghostImage.style.opacity = "0.5";
      ghostImage.style.position = "absolute";  
      
      const touchX = touchStartX + window.scrollX;
      const touchY = touchStartY + window.scrollY;

      const offsetX = ghostImage.offsetLeft / 2;
      const offsetY = ghostImage.offsetTop / 2;
      console.log(offsetX, offsetY);
      console.log(touchStartX, touchStartY, "draggedItem");

      ghostImage.style.left = touchX - offsetX + 'px';
      ghostImage.style.top = touchY - offsetY + 'px';

      ghostImageContainer.appendChild(ghostImage);

      ghostImageContainer.style.left = touchX - offsetX + 'px';
      ghostImageContainer.style.top = touchY - offsetY + 'px';

    }
  }
  
  function touchMove(e) {
    e.preventDefault();
    if (!draggedItem) return;

    offsetX = e.touches[0].clientX - touchStartX;
    offsetY = e.touches[0].clientY - touchStartY;

    createGhostImage()

    ghostImageContainer.style.left = originalX + offsetX + "px";
    ghostImageContainer.style.top = originalY + offsetY + "px";

    const items = document.querySelectorAll('.images');
    let targetItem = null;

    items.forEach((item, index) => {
      if (item === draggedItem) return;
      const rect = item.getBoundingClientRect();

      if (
        e.touches[0].clientX > rect.left &&
        e.touches[0].clientX < rect.right &&
        e.touches[0].clientY > rect.top &&
        e.touches[0].clientY < rect.bottom
      ) {
        targetItem = item;
        draggedItemIndex = index;
        console.log("draggedItemIndex:", draggedItemIndex)
      }
    });
  }
  
  async function touchEnd(e) {
    if (!draggedItem) return;

    if (!draggedItemIndex && draggedItemIndex !== 0) {
      ghostImageContainer.parentNode.removeChild(ghostImageContainer);
      return
    };

    if (ghostImageContainer) {
      ghostImageContainer.parentNode.removeChild(ghostImageContainer);
      ghostImageContainer = null;
    }
  
    const items = document.querySelectorAll('.images');
    const newImageOrder = Array.from(items).map(item => item.dataset.imageId);
    
    const draggedItemId = newImageOrder.splice(originalIndex, 1)[0]; 
    newImageOrder.splice(draggedItemIndex, 0, draggedItemId); 

    try {
      await axios.post(
        "/api/image/save-order",
        { imageOrder: newImageOrder },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log('New order saved successfully');
    } catch (error) {
      console.error('Error saving new order:', error);
    }

    draggedItem = null;
    draggedItemIndex = 0; 
    window.location.reload();
  }
  
  const images = document.querySelectorAll(".images");
  images.forEach((image) => {
    image.addEventListener("touchstart", touchStart, { passive: false });
    image.addEventListener("touchmove", touchMove, { passive: false });
    image.addEventListener("touchend", touchEnd, { passive: false });
  });

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
          <div id="image-form" className="box-shadow">
            <h3>Add Artwork</h3>
            <form onSubmit={submitImage}>
              <input type="file" onChange={handleChange} multiple />
              <button className="button-submit" disabled={!isImageSelected}>Upload</button>
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
                    className="art art-dimensions box-shadow images"
                    onClick={() => toggleModal(index)}
                    draggable
                    onDragStart={handleDragStart(index)} 
                    onDragOver={handleDragOver} 
                    onDrop={handleDrop(index)}
                    data-image-id={data._id}
                  />
                  {adminIsLoggedIn && (
                    <button className="position-absolute bottom-0 end-0 m-2 m-md-4 btn btn-danger" onClick={() => handleShow(data._id)}><FontAwesomeIcon icon={faTrash} /></button>
                  )}
                </div>
              );
            })}
            {allImages == null
              ? ""
              :allImages.map((data) => {
               return <Modal 
                        key={data._id} 
                        show={showDelete[data._id]} 
                        onHide={handleClose} 
                        centered
                      >
                        <Modal.Body>Are you sure you want to delete this image?</Modal.Body>
                        <Modal.Footer>
                          <button className="btn btn-secondary" onClick={handleClose}>
                            Cancel
                          </button>
                          <button className="btn btn-danger" onClick={() => handleDeleteImage(data._id)}>
                            Delete
                          </button>
                        </Modal.Footer>
                      </Modal>
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Portfolio;