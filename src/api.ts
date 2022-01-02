const apiKey = "1c5abaaeaa13c66b570ad3042a0d51f4";

export async function movieFetch(page: number, value: string) {
  const url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey;
  const searchParam = "&query=" + value + "&page=" + page;
  const query = url + searchParam;

  const response = await fetch(query);
  return response.json();
}

export async function genreFetch() {
  const url = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + apiKey;

  const response = await fetch(url);
  return response.json();
}

export async function latestMoviesFetch(page: number) {
  const url = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + apiKey;
  const searchParam = url + "&page=" + page;

  const response = await fetch(searchParam);
  return response.json();
}

export async function detailFetch(id: number) {
  const url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + apiKey;

  const response = await fetch(url);
  return response.json();
}