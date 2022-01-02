import {FC, useEffect, useState } from "react";
import MovieModal from "../containers/MovieModal";

const Home:FC = () => {
  const [searchedMovie, setSearchedMovie] = useState<string>("");
  const [genres, setGenres] = useState<[]>();
  const [latestMovies, setLatestMovies] = useState<[]>();
  const [searchResults, setSearchResults] = useState<[]>();
  const apiKey = "1c5abaaeaa13c66b570ad3042a0d51f4";

  //TODO: pages should be included or load on scrolling
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

    async function latestMoviesFetch() {
      const url = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + apiKey;

      const response = await fetch(url);
      const data = response.json();
      const results = data.then(response => {
        setLatestMovies(response.results);
      }).catch(error => console.log(error));
    }
    latestMoviesFetch();

  },[]);

  const handleSearch = (value: string) => {
    setSearchedMovie(value);
    
    if (value.length < 3) {
      return;
    } else if (value.length === 0) {
      setSearchResults([]);
    }

    async function movieFetch() {
      const url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey;
      const searchParam = "&query=" + value;
      const query = url + searchParam;

      const response = await fetch(query);
      const data = response.json();
      const results = data.then(response => {
        console.log("searched",response.results);
        setSearchResults(response.results);
      }).catch(error => console.log(error));
    }

    movieFetch();
  }

  const renderGenre = (result: any) => {
    const filteredGenres:any = [];
    let finalGenres = "";
    genres?.filter((genre: any) => {
      result.genre_ids.map((id: number) => {
        if (genre.id === id) {
          filteredGenres.push(genre.name);
        }
      })
    });
    
    // eslint-disable-next-line array-callback-return
    filteredGenres.map((genre: any, index: number) => {
      if (index === 0) {
        finalGenres = genre;
      } else {
        finalGenres += ", " + genre;
      }
    });

    return finalGenres;
  }

  const handleSearchResults = () => {
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

  const renderLatestMovies = () => {
    return latestMovies?.map((result: any, index) => {
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

  return <div style={{ paddingBottom: "100px" }}>
    <div>
      <p>Search:</p>
      <input 
        onBlur={(e) => handleSearch(e.target.value)}
        onChange={(e) => handleSearch(e.target.value)} 
        type="search" value={searchedMovie} />
    </div>
    <div>
      <p>Results</p>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {searchedMovie.length >= 3 ? 
        handleSearchResults() : 
        renderLatestMovies()}
      </div>
    </div>
  </div>;
}

export default Home;