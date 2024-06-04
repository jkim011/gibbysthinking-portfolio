import React from "react";
import GabbyAvatar from '../assets/gabby-avatar-cropped.png';

function AboutMe() {
  return (
    <div id="about-me">
      <img src={GabbyAvatar} className="about-me-pic me-lg-3"/>
      <div className="about-me-text ms-lg-3">
        <h1 className="mb-4">About Me</h1>
        <p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum. </p>
      </div>
    </div>
  )
}

export default AboutMe;