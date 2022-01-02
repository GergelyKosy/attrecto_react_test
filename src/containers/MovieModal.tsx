import React, { FC, useEffect, useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface IMovieModal {
  title: string,
  description: string,
  genre: string,
  releaseDate: string,
  id: number,
  imageUrl: string 
}

const apiKey = "1c5abaaeaa13c66b570ad3042a0d51f4";

const MovieModal:FC<IMovieModal> = ({
  title,
  description,
  genre,
  releaseDate,
  id,
  imageUrl 
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState();

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
    <div>
      <div style={{ border: "1px solid grey", width: "250px" }} onClick={openModal}>
          <img 
            width="200px"
            height="auto"
            src={imageUrl && "https://image.tmdb.org/t/p/w300_and_h450_bestv2"+imageUrl} 
            alt="" />
          <div>{title}</div>
          <div>{releaseDate}</div>
          <div style={{ display: "flex", justifyContent: "center" }}>{genre}</div>
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
        <div>
          <p>{title}</p>
          <p>{description}</p>
          <div>{genre}</div>
          <p>{releaseDate}</p>
          <p>{}</p>
          <p>{}</p> 
          <p>{}</p> 
        </div>
        <button onClick={closeModal}>x</button>
      </Modal>
    </div>
  );
}

export default MovieModal;