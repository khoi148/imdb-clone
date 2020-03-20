import React, { useEffect, useState, componentDidMount } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Movie from "./components/Movie.js";
import { Nav, FormControl, Button } from "react-bootstrap";

const APIKEY = "4196bd6ab6c4a09843227e9e8cab47a0";
let keyword = "";
let movieList = []; //keep original list

export default function App() {
  let [movies, setMovies] = useState([]);
  let moment = require("moment");

  async function currentlyPlaying() {
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US&page=1`;
    let response = await fetch(url);
    let result = await response.json();
    movieList = result.results;
    setMovies(result.results);
    console.log(result);
  }
  function searchByKeyWord() {
    console.log(keyword);
    if (keyword === "") {
      setMovies(movieList);
    } else {
      setMovies(
        movieList.filter(item =>
          item.title.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }
  }
  function sortByPopularity() {
    setMovies(
      //I use concat to make a copy, before sorting. This makes sure original is untouched
      //And is a work around to make sure the setState actually notices a change,rerenders
      movieList.concat().sort((item1, item2) => {
        console.log(item1.popularity);
        return item2.popularity - item1.popularity;
      })
    );
  }

  useEffect(() => {
    console.log("hi");
    currentlyPlaying();
  }, []);

  return (
    <div className="App">
      {console.log(movies)}
      <Nav>
        test
        <FormControl
          text="hi"
          placeholder="search"
          onChange={e => (keyword = e.target.value)}
        />
        <Button onClick={() => searchByKeyWord()}>Search</Button>
        <Button onClick={() => sortByPopularity()}>Popular</Button>
      </Nav>
      <div className="row d-flex flex-wrap justify-content-center w-100 bg-warning">
        {movies.length !== 0 &&
          movies.map((item, index) => {
            return (
              <Movie
                img={item.poster_path}
                title={item.title}
                year={moment(item.release_date).format("YYYY")}
                rating={item.vote_average}
                description={item.overview}
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
