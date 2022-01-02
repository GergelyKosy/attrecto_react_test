import React, { FC, useEffect, useState } from 'react';
import Modal from 'react-modal';
import ModalContent from './Modal/ModalContent';
import { BsXSquareFill } from "react-icons/bs";


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

const apiKey = "1c5abaaeaa13c66b570ad3042a0d51f4";

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
    async function detailFetch() {
      const url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + apiKey;

      const response = await fetch(url);
      const data = response.json();
      const results = data.then(response => {
        setDetail(response);
      }).catch(error => console.log(error));
    }

    detailFetch();
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
        style={{ 
          width: "250px",
          margin: "10px",
          height: "400px",
          position: "relative",
          cursor: "pointer"
        }}
        onClick={openModal}>
          <img 
            style={{
              width: "inherit",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px"
            }}
            height="auto"
            src={imageUrl && "https://image.tmdb.org/t/p/w300_and_h450_bestv2"+imageUrl} 
            alt="" />
          <div style={{
            borderTop: "unset",
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: "black"
          }}>
            <div>{title}</div>
            <div>{releaseDate}</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p style={{
                margin: "auto",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap"
              }}>{genre}</p>
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
        <div style={{ overflowY: "auto", padding: "25px", display: "flex" }}>
          <ModalContent
            title={title}
            description={description}
            genre={genre}
            releaseDate={releaseDate}
            imdb_id={detail?.imdb_id}
            runtime={detail?.runtime}
            countries={detail?.production_countries}
          />
          <div style={{
            fontSize: "24px",
            fontWeight: "700",
            cursor: "pointer",
            position: "absolute",
            top: 0,
            right: 0,
            margin: "20px"
          }} onClick={closeModal}>
            <BsXSquareFill />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default MovieModal;