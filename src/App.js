import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Movie from "./components/Movie.js";

export default function App() {
  let [movies, setMovies] = useState(null);
  let moment = require("moment");

  async function currentlyPlaying() {
    let APIKEY = "4196bd6ab6c4a09843227e9e8cab47a0";
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US&page=1`;
    let response = await fetch(url);
    let result = await response.json();
    setMovies(result);
    console.log(result);
  }

  useEffect(() => {
    currentlyPlaying();
  }, []);
  return (
    <div className="App">
      <div className="d-flex flex-wrap justify-content-center">
        {movies !== null &&
          movies.results.map((item, index) => {
            return (
              <Movie
                img={movies !== null && item.poster_path}
                title={movies !== null && item.title}
                year={
                  movies !== null && moment(item.release_date).format("YYYY")
                }
                rating={movies !== null && item.vote_average}
                description={movies !== null && item.overview}
              />
            );
          })}
      </div>
    </div>
  );
}

/*inside the "movies" fetch call is an object. from url movie/popular?api_key=...&language=en-US&page=1  
{ 
results: Array (20) [ //usually hundreds to thousands of results, but only get 20 at a time, adjust by changing page parameter in url
index
  0 Object
adult: false
backdrop_path: "/5BwqwxMEjeFtdknRV792Svo0K1v.jpg"
genre_ids: [12, 18, 9648, 878, 53] (5)
id: 419704
original_language: "en"
original_title: "Ad Astra"
overview: "The near future, a time when both hope and hardships drive humanity to look to the stars and beyond. While a mysterious phenomenon menace…"
popularity: 366.195
poster_path: "/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg"
release_date: "2019-09-17"
title: "Ad Astra"
video: false
vote_average: 6
vote_count: 2601
]
}
*/
