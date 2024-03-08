import React, { useEffect, useState, useRef } from "react";
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
    if (e.type === 'touchstart') {
      // const touch = e.touches[0];
      // e.clientX = touch.pageX;
      // e.clientY = touch.pageY;
      console.log("touch starting ")
      console.log(index)
    }
    if (e.dataTransfer) {
      e.dataTransfer.setData("index", index);
    }
  };

  const handleDragOver = (e) => {

    if (e.type === 'touchmove') {
      // e.preventDefault();
      console.log("touch moving ")
    }
    if (e.dataTransfer) {
      e.preventDefault();
      console.log("touch moving ")
    }
  };
  
  const handleDrop = (index) => (e) => {
    // e.preventDefault();
    if (e.type === 'touchend') {
      // const touch = e.changedTouches[0];
      // e.clientX = touch.pageX;
      // e.clientY = touch.pageY;
      console.log("touch ending ")
      console.log(index)
    }
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

///////////////////////////////////////////////////////////////
let draggedItem = null;
let touchStartX = 0;
let touchStartY = 0;
let originalIndex = 0;
let originalX = 0;
let originalY = 0;
let draggedItemIndex = 0;

function touchStart(e) {
  draggedItem = e.target;
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  originalIndex = Array.from(draggedItem.parentNode.children).indexOf(draggedItem);
  originalX = draggedItem.offsetLeft;
  originalY = draggedItem.offsetTop;
  draggedItem.style.position = 'absolute';
  draggedItem.style.zIndex = '1000';
}

function touchMove(e) {
  e.preventDefault(); 
  if (!draggedItem) return;

  const deltaX = e.touches[0].clientX - touchStartX;
  const deltaY = e.touches[0].clientY - touchStartY;
  const newX = originalX + deltaX;
  const newY = originalY + deltaY;

  draggedItem.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

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
      console.log("index:", index)
    }
  });

  // if (targetItem) {
  //   const parent = draggedItem.parentNode;
  //   const draggedIndex = Array.from(parent.children).indexOf(draggedItem);
  //   const targetIndex = Array.from(parent.children).indexOf(targetItem);

  //   parent.removeChild(draggedItem);
  //   if (draggedIndex > targetIndex) {
  //     if (targetItem.nextSibling) {
  //       parent.insertBefore(draggedItem, targetItem.nextSibling);
  //     } else {
  //       parent.appendChild(draggedItem);
  //     }
  //   } else {
  //     parent.appendChild(draggedItem);
  //   }
  // }
}

async function touchEnd(e) {
  if (!draggedItem) return;

  draggedItem.style.position = '';
  draggedItem.style.zIndex = '';
  draggedItem.style.transform = '';

  const items = document.querySelectorAll('.images');
  const newImageOrder = Array.from(items).map(item => item.dataset.imageId);
  
  const draggedItemId = newImageOrder.splice(originalIndex, 1)[0]; 
  newImageOrder.splice(draggedItemIndex, 0, draggedItemId); 

  const parent = draggedItem.parentNode;
  parent.removeChild(draggedItem); 
  if(originalIndex > draggedItemIndex) {
    parent.insertBefore(draggedItem, parent.children[draggedItemIndex]);
  } else {
    parent.append(draggedItem)
  }

  console.log('New item order:', newImageOrder);

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
}

const images = document.querySelectorAll('.images')
images.forEach(image => {
  image.addEventListener('touchstart', touchStart, { passive: false });
  image.addEventListener('touchmove', touchMove, { passive: false });
  image.addEventListener('touchend', touchEnd, { passive: false });
})
//////////////////////////////////////////////////

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
                    // onTouchStart={handleDragStart(index)} 
                    // onTouchMove={handleDragOver}
                    // onTouchEnd={handleDrop(index)} 
                    // onTouchStart={touchStart}
                    // onTouchMove={touchMove}
                    // onTouchEnd={touchEnd}
                    data-image-id={data._id}
                  />
                  {adminIsLoggedIn && (
                    <button className="position-absolute bottom-0 end-0 m-2 m-md-4" onClick={() => handleDeleteImage(data._id)}>Delete</button>
                    
                  )}
                  {/* <Modal show={showDelete} onHide={handleClose} center>
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
                  </Modal> */}
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