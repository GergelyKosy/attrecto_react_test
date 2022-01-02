import React, { FC, useEffect, useState } from 'react';
import Modal from 'react-modal';
import ModalContent from '../ModalContent/ModalContent';
import { BsXSquareFill } from "react-icons/bs";
import { detailFetch } from '../../../api';
import './MovieModal.css';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: "flex",
    backgroundColor: "black",
    height: "450px",
    padding: "unset",
    maxWidth: "800px",
    fontFamily: "roboto",
    fontWeight: "500",
    borderTopLeftRadius: "15px",
    borderBottomLeftRadius: "15px"
  },
};

interface IMovieModal {
  title: string,
  description: string,
  genre: string,
  releaseDate: string,
  id: number,
  imageUrl: string,
  index: number
}

interface IDetail {
  imdb_id: string,
  runtime: number,
  production_countries: []
}

const MovieModal:FC<IMovieModal> = ({
  title,
  description,
  genre,
  releaseDate,
  id,
  imageUrl,
  index
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState<IDetail>();

  useEffect(() => {
    detailFetch(id).then(response => {
      setDetail(response);
    }).catch(error => console.log(error));
  }, []);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <div key={index}>
      <div
        className="Movie_preview-container"
        onClick={openModal}>
          <img 
            className="Movie_preview-picture"
            height="auto"
            src={imageUrl && "https://image.tmdb.org/t/p/w300_and_h450_bestv2"+imageUrl} 
            alt="" />
          <div className="Movie_preview-details">
            <div>{title}</div>
            <div>{releaseDate}</div>
            <div className="Movie_preview-genre_container">
              <p className="Movie_preview-genre_text">{genre}</p>
            </div>  
          </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <img src={imageUrl && "https://image.tmdb.org/t/p/w300_and_h450_bestv2"+imageUrl} alt=""/>
        </div>
        <div className="Modal_content_container">
          <ModalContent
            title={title}
            description={description}
            genre={genre}
            releaseDate={releaseDate}
            imdb_id={detail?.imdb_id}
            runtime={detail?.runtime}
            countries={detail?.production_countries}
          />
          <div className="Modal_content-close_button" onClick={closeModal}>
            <BsXSquareFill />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default MovieModal;