import {FC, useEffect, useState } from "react";
import MovieModal from "../containers/MovieModal";

const Home:FC = () => {
  const [searchedMovie, setSearchedMovie] = useState<string>("");
  const [genres, setGenres] = useState<[]>();
  const [searchResults, setSearchResults] = useState<[]>();
  const apiKey = "1c5abaaeaa13c66b570ad3042a0d51f4";

  useEffect(() => {
    async function genreFetch() {
      const url = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + apiKey;

      const response = await fetch(url);
      const data = response.json();
      const results = data.then(response => {
        setGenres(response.genres);
      }).catch(error => console.log(error));
    }

    genreFetch();
  },[]);

  const handleSearch = (value: string) => {
    setSearchedMovie(value);
    
    if (value.length < 3) {
      return;
    }

    async function movieFetch() {
      const url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey;
      const searchParam = "&query=" + value;
      const query = url + searchParam;

      const response = await fetch(query);
      const data = response.json();
      const results = data.then(response => {
        setSearchResults(response.results);
      }).catch(error => console.log(error));
    }

    movieFetch();
  }

  const renderGenre = (result: any) => {
    const filteredGenres:any = [];
    genres?.filter((genre: any) => {
      result.genre_ids.map((id: number) => {
        if (genre.id === id) {
          filteredGenres.push(genre.name);
        }
      })
    });
    
    return filteredGenres.map((genre: any, index: number) => {
      return <p key={index}>{genre}</p>;
    });
  }

  const handleSearchResults = () => {
    console.log(searchResults);
    if (!searchResults || searchResults.length === 0) {
      return <div>Nincs találat</div>;
    } return searchResults.map((result: any, index) => {
      return <MovieModal 
        title={result.title}
        description={result.overview}
        genre={renderGenre(result)}
        releaseDate={result.release_date}
        id={result.id}
        imageUrl={result.poster_path} 
      />
    });
  }

  return <div>
    Home
    <div>
      <p>Search:</p>
      <input onChange={(e) => handleSearch(e.target.value)} type="search" value={searchedMovie} />
    </div>
    <div>
      <p>Results</p>
      <div style={{ display: "flex" }}>
        {handleSearchResults()}
      </div>
    </div>
  </div>;
}

export default Home;