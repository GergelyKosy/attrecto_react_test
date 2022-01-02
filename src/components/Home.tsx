import {FC, useEffect, useState } from "react";
import MovieModal from "../containers/MovieModal";



const Home:FC = () => {
  const [searchedMovie, setSearchedMovie] = useState<string>("");
  const [genres, setGenres] = useState<[]>();

  const [latestMovies, setLatestMovies] = useState<[]>();
  const [moviesPageCount, setMoviesPageCount] = useState<number>(0);
  const [latestMoviesPageCount, setLatestMoviesPageCount] = useState<number>(0);
  const [pageCounter, setPageCounter] = useState<number>(1);

  const [searchResults, setSearchResults] = useState<[]>();
  const apiKey = "1c5abaaeaa13c66b570ad3042a0d51f4";

  // FETCH
  async function latestMoviesFetch(page: number) {
    const url = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + apiKey;
    const searchParam = url + "&page=" + page;

    setPageCounter(page);

    const response = await fetch(searchParam);
    const data = response.json();
    const results = data.then(response => {
      setLatestMoviesPageCount(response.total_pages);
      setLatestMovies(response.results);
    }).catch(error => console.log(error));
  }

  async function genreFetch() {
    const url = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + apiKey;

    const response = await fetch(url);
    const data = response.json();
    const results = data.then(response => {
      setGenres(response.genres);
    }).catch(error => console.log(error));
  }

  async function movieFetch(page: number, value: string) {
    const url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey;
    const searchParam = "&query=" + value + "&page=" + page;
    const query = url + searchParam;

    setPageCounter(page);

    const response = await fetch(query);
    const data = response.json();
    const results = data.then(response => {
      setMoviesPageCount(response.total_pages);
      setSearchResults(response.results);
    }).catch(error => console.log(error));
  }

  //TODO: pages should be included or load on scrolling
  useEffect(() => {
    genreFetch();
    latestMoviesFetch(1);
  },[]);

  const handleSearch = (value: string) => {
    setSearchedMovie(value);
    setPageCounter(1);
    if (value.length < 3) {
      return;
    } else if (value.length === 0) {
      setSearchResults([]);
    }

    movieFetch(pageCounter, value);
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
        index={index}
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
        index={index}
        title={result.title}
        description={result.overview}
        genre={renderGenre(result)}
        releaseDate={result.release_date}
        id={result.id}
        imageUrl={result.poster_path} 
      />
    });
  }

  const fetchMoreMovies = (movies: string, forward: boolean) => {
    console.log(pageCounter);
    console.log(moviesPageCount);
    console.log(latestMoviesPageCount);
    console.log(movies);
    console.log(forward);
    if (movies === "latestMovies") {
      if (forward) latestMoviesFetch(pageCounter + 1);
      else {
        latestMoviesFetch(pageCounter - 1);
      }
    } else {
      if (forward) movieFetch(pageCounter + 1, searchedMovie);
      else {
        movieFetch(pageCounter - 1, searchedMovie);
      }
    }
  }

  const renderNavigationButtons = (type: string) => {
    if (type === "latestMovies") {
      return <>
        <button 
          disabled={pageCounter === 1}
          onClick={() => fetchMoreMovies("latestMovies", false)}>Back</button>
        <button 
          disabled={latestMoviesPageCount === pageCounter}
          onClick={() => fetchMoreMovies("latestMovies", true)}>Forward</button>
      </>
    } 
    return <>
      <button 
        disabled={pageCounter === 1}
        onClick={() => fetchMoreMovies("searchedMovies", false)}>Back</button>
      <button 
        disabled={moviesPageCount === pageCounter}
        onClick={() => fetchMoreMovies("searchedMovies", true)}>Forward</button>
    </>
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
        {searchedMovie.length >= 3 ? (
          handleSearchResults()
        ) : (
          renderLatestMovies()
        )}
      </div>
      {searchedMovie.length >= 3 ? renderNavigationButtons("searchedMovies") :
        renderNavigationButtons("latestMovies")}
    </div>
  </div>;
}

export default Home;