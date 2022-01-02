import {FC, useEffect, useState } from "react";
import { genreFetch, latestMoviesFetch, movieFetch } from "../../api";
import MovieModal from "../../containers/Modal/MovieModal/MovieModal";
import "./Home.css";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

const Home:FC = () => {
  const [searchedMovie, setSearchedMovie] = useState<string>("");
  const [genres, setGenres] = useState<[]>();

  const [latestMovies, setLatestMovies] = useState<[]>();
  const [moviesPageCount, setMoviesPageCount] = useState<number>(0);
  const [latestMoviesPageCount, setLatestMoviesPageCount] = useState<number>(0);
  const [pageCounter, setPageCounter] = useState<number>(1);

  const [searchResults, setSearchResults] = useState<[]>();

  // FETCH
  const handleLatestMoviesFetch = (page: number) => {
    latestMoviesFetch(page).then(response => {
      setPageCounter(page);
      setLatestMoviesPageCount(response.total_pages);
      setLatestMovies(response.results);
    }).catch(error => console.log(error));
  }

  const handleGenreFetch = () => {
    genreFetch().then(response => {
      setGenres(response.genres);
    }).catch(error => console.log(error));
  }

  const handleMovieFetch = (pageCounter: number, value: string) => {
    movieFetch(pageCounter, value).then(response => {
      setPageCounter(pageCounter);
      setMoviesPageCount(response.total_pages);
      setSearchResults(response.results);
    }).catch(error => console.log(error));
  }

  useEffect(() => {
    handleGenreFetch();
    handleLatestMoviesFetch(1);
  },[]);

  const handleSearch = (value: string) => {
    setSearchedMovie(value);
    setPageCounter(1);

    if (value.length < 3) {
      return;
    } else if (value.length === 0) {
      setSearchResults([]);
    }

    handleMovieFetch(pageCounter, value);
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
    if (movies === "latestMovies") {
      if (forward) handleLatestMoviesFetch(pageCounter + 1);
      else {
        handleLatestMoviesFetch(pageCounter - 1);
      }
    } else {
      if (forward) handleMovieFetch(pageCounter + 1, searchedMovie);
      else {
        handleMovieFetch(pageCounter - 1, searchedMovie);
      }
    }
  }

  const renderNavigationButtons = (type: string) => {
    if (type === "latestMovies") {
      return <>
        <button 
          className={pageCounter === 1 ? 
            "navigation_button_disabled" : "navigation_button"}
          disabled={pageCounter === 1}
          onClick={() => fetchMoreMovies("latestMovies", false)}>
            <BsArrowLeftCircle size={40} />
          </button>
        <button 
          className={latestMoviesPageCount === pageCounter ? 
            "navigation_button_disabled" : "navigation_button"}
          disabled={latestMoviesPageCount === pageCounter}
          onClick={() => fetchMoreMovies("latestMovies", true)}>
            <BsArrowRightCircle size={40} />
          </button>
      </>
    } 
    return <>
      <button
        className={pageCounter === 1 ? 
          "navigation_button_disabled" : "navigation_button"}
        disabled={pageCounter === 1}
        onClick={() => fetchMoreMovies("searchedMovies", false)}>
          <BsArrowLeftCircle size={40} />
        </button>
      <button 
        className={moviesPageCount === pageCounter ? 
          "navigation_button_disabled" : "navigation_button"}
        disabled={moviesPageCount === pageCounter}
        onClick={() => fetchMoreMovies("searchedMovies", true)}>
          <BsArrowRightCircle size={40} />
          </button>
    </>
  }

  return <div className="Home_container">
    <div>
      <p>Search:</p>
      <input 
        placeholder="Search for a movie..."
        className="Home-search_field"
        onBlur={(e) => handleSearch(e.target.value)}
        onChange={(e) => handleSearch(e.target.value)} 
        type="search" value={searchedMovie} />
    </div>
    <div>
      <div className="navigation_button_container">
        {searchedMovie.length >= 3 ? renderNavigationButtons("searchedMovies") :
          renderNavigationButtons("latestMovies")}
      </div>
      <div className="Results_container">
        {searchedMovie.length >= 3 ? (
          handleSearchResults()
        ) : (
          renderLatestMovies()
        )}
      </div>
      <div className="navigation_button_container">
        {searchedMovie.length >= 3 ? renderNavigationButtons("searchedMovies") :
          renderNavigationButtons("latestMovies")}
      </div>
    </div>
  </div>;
}

export default Home;