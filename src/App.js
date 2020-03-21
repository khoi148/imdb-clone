import React, { useEffect, useState } from "react";
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Movie from "./components/Movie.js";
import Pagination from "./components/Pagination.js";
import Sources from "./components/Sources.js";
import { Nav, FormControl, Button } from "react-bootstrap";

const APIKEY = "4196bd6ab6c4a09843227e9e8cab47a0";
let url = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US`;
//`https://api.themoviedb.org/3/discover/movie?with_genres=18&primary_release_year=2015,2016&api_key=${APIKEY}&language=en-US`;
let keyword = "";
let movieList = []; //keep original list
let pageNum = 1;
let category = "popular";
export default function App() {
  let [movies, setMovies] = useState([]);
  let [totalPages, setTotalPages] = useState(0);
  let moment = require("moment"); //moment.js api

  function switchCategory(event) {
    pageNum = 1;
    category = event.target.value;
    let urlBeginner = `https://api.themoviedb.org/3/movie/`;
    let urlFinisher = `?api_key=${APIKEY}&language=en-US`;
    url = urlBeginner + event.target.value + urlFinisher;
    currentlyPlaying();

    //?api_key=${APIKEY}&language=en-US`
  }
  async function switchPage(event) {
    let value = event.target.value;

    if (value === "next") pageNum += 1;
    else if (value === "previous") pageNum -= 1;
    else if (value === "next-5") pageNum += 5;
    else if (value === "previous-5") pageNum -= 5;
    else pageNum = parseInt(value);

    if (pageNum < 1) pageNum = 1;
    if (pageNum > totalPages) pageNum = totalPages;
    console.log(pageNum);
    let url2 = url + `&page=${pageNum}`;
    let response = await fetch(url2);
    let result = await response.json();
    movieList = result.results;
    setMovies(result.results);
    return pageNum;
  }
  async function currentlyPlaying() {
    //`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US`;
    let response = await fetch(url);
    let result = await response.json();
    console.log(result);

    setTotalPages(result.total_pages);
    console.log(result.total_pages);
    movieList = result.results;
    setMovies(result.results);
    console.log(result);
  }
  function searchByKeyWord() {
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
        return item2.popularity - item1.popularity;
      })
    );
  }

  useEffect(() => {
    //similar to componentDidMount
    currentlyPlaying();
  }, []);
  return (
    <div className="App">
      {console.log("parent reload")}
      <Nav className="bg-dark">
        {totalPages !== 0 && (
          <Pagination
            parentMethod={switchPage}
            page={pageNum}
            totalPages={totalPages}
          />
        )}
        <Sources parentMethod={switchCategory} category={category} />
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
                className="example"
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
