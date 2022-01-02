import {FC, useEffect, useState } from "react";

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
    return searchResults && searchResults.map((result: any, index) => {
      
      return <div key={index}>
        <img src={result.poster_path} alt="" />
        <div>{result.title}</div>
        <div>{result.release_date}</div>
        <div style={{ display: "flex", justifyContent: "center" }}>{renderGenre(result)}</div>
      </div>
    })
  }

  return <div>
    Home
    <div>
      <p>Search:</p>
      <input onChange={(e) => handleSearch(e.target.value)} type="search" value={searchedMovie} />
    </div>
    <div>
      <p>Results</p>
      <div>
        {handleSearchResults()}
      </div>
    </div>
  </div>;
}

export default Home;