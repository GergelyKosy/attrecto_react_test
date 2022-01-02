import React, { FC, } from 'react';

interface IMovieModal {
  title: string,
  description: string,
  genre: string,
  releaseDate: string,
  imdb_id: string | undefined,
  runtime: number | undefined,
  country: [] | undefined
}

const ModalContent:FC<IMovieModal> = ({
  title,
  description,
  genre,
  releaseDate,
  imdb_id,
  runtime,
  country
}) => {
 
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <div>{genre}</div>
      <p>{releaseDate}</p>
      <a target="_blank" href={"https://www.imdb.com/title/" + imdb_id} rel="noreferrer">IMDB link</a>
      <p>{runtime}</p> 
      <p>{}</p> 
    </div>
  );
}

export default ModalContent;