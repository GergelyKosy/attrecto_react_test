import {FC, useEffect, useState } from "react";

const Home:FC = () => {
  const [searchedMovie, setSearchedMovie] = useState<string>("");
  const [searchResults, setSearchResults] = useState<[]>();
  const apiKey = "1c5abaaeaa13c66b570ad3042a0d51f4";

  useEffect(() => {
    
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
        console.log(response.results);
        setSearchResults(response.results);
      }).catch(error => console.log(error));
    }

    movieFetch();
  }

  const handleSearchResults = () => {
    console.log(searchResults);
    return searchResults && searchResults.map((result: any, index) => (
      <div key={index}>
        <div>{result.title}</div>
      </div>
    ))
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