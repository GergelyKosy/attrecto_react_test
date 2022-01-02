import React, { FC } from 'react';
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

const MovieModal:FC<IMovieModal> = ({
  title,
  description,
  genre,
  releaseDate,
  id,
  imageUrl 
}) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <div style={{ border: "1px solid grey", width: "250px" }} onClick={openModal}>
          <img src={imageUrl} alt="" />
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
          <img src={imageUrl} alt=""/>
        </div>
        <div>
          <p>{title}</p>
          <p>{description}</p>
          <p>{genre}</p>
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