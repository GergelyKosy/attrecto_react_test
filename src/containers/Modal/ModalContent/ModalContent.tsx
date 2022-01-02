import React, { FC, } from 'react';
import './ModalContent.css';

interface IMovieModal {
  title: string,
  description: string,
  genre: string,
  releaseDate: string,
  imdb_id: string | undefined,
  runtime: number | undefined,
  countries: [] | undefined
}

const ModalContent:FC<IMovieModal> = ({
    title,
    description,
    genre,
    releaseDate,
    imdb_id,
    runtime,
    countries
  }) => {

  const movieDetail = [
    {
      leftSide: <h3>Title:</h3>,
      rightSide: <h3>{title}</h3>
    },
    {
      leftSide: "Description:",
      rightSide: description
    },
    {
      leftSide: "Genre:",
      rightSide: genre
    },
    {
      leftSide: "Release date:",
      rightSide: releaseDate
    },
    {
      leftSide: "IDMB link:",
      rightSide: <a 
        target="_blank" 
        href={"https://www.imdb.com/title/" + imdb_id} 
        rel="noreferrer">https://www.imdb.com/title/ {imdb_id}</a>
    },
    {
      leftSide: "Runtime:",
      rightSide: runtime
    },
    {
      leftSide: "Country:",
      rightSide: countries?.length !== 0 ? countries?.map((country: any, index: number) => {
          if (index === 0) {
            return country.name;
          } return ", " + country.name;
        }) : "-"
    },
  ]

  return (
    <div>
      <table className="Details_table-container">
        <tbody>
          {movieDetail.map((detail, index) => (
            <tr key={index}>
              <td className="Details_table-left_side">{detail.leftSide}</td>
              <td className="Details_table-right_side">{detail.rightSide}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ModalContent;