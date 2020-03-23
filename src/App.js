import React, { useEffect, useState } from "react";
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./Logo-IMDB.png";
import ReactModal from "react-modal";
import YouTube from "@u-wave/react-youtube";

import Movie from "./components/Movie.js";
import Pagination from "./components/Pagination.js";
import Sources from "./components/Sources.js";
import Search from "./components/Search.js";
import Reorder from "./components/Reorder.js";
import { sortByMethod } from "./util.js";

const APIKEY = "4196bd6ab6c4a09843227e9e8cab47a0";
let url = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&include_adult=false&language=en-US`;

let urlFinisher = `api_key=${APIKEY}&language=en-US&include_adult=false`;
let movieList = []; //keep original list
let pageNum = 1;
let category = "popular";

export default function App() {
  let [movies, setMovies] = useState([]);
  let [totalPages, setTotalPages] = useState(0);
  let [toggleModal, setToggleModal] = useState(false);
  let [modalVideoID, setModalVideoId] = useState('');
  let moment = require("moment"); //moment.js api

  function switchCategory(event) {
    pageNum = 1;
    category = event.target.value; //includes values like 'popular, top_rated, upcoming, now_playing
    let urlBeginner = `https://api.themoviedb.org/3/movie/`;
    url = urlBeginner + event.target.value + "?" + urlFinisher;
    currentlyPlaying();
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
    url = url + `&page=${pageNum}`;
    currentlyPlaying();
    return pageNum; //tells child component which page we are on
  }
  async function currentlyPlaying() {
    //api call based on current url params
    let response = await fetch(url);
    let result = await response.json();
    setTotalPages(result.total_pages);
    movieList = result.results;
    setMovies(result.results);
    console.log(result);
  }
  function searchByKeyWord(keyword) {
    if (keyword === "") {
      setMovies(movieList);
    } else {
      let urlBeginner = `https://api.themoviedb.org/3/search/movie?query=${keyword}&`;
      url = urlBeginner + urlFinisher;
      currentlyPlaying();
    }
  }
  function sortByValue(event) {
    // let sortBy = event.target.value;
    let sortedArray = sortByMethod(event.target.value, movieList);
    setMovies(sortedArray);
  }

  async function toggleModalMethod(movie_id) {
    // let movie_id = 570670;
    let urlVid = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${APIKEY}&language=en-US`;
    let response = await fetch(urlVid);
    let result = await response.json();
    setModalVideoId(result.results[0].key);
    setToggleModal(true);
  }

  useEffect(() => {
    currentlyPlaying();
  }, []);

  return (
    <div className="App">
      <div className="d-flex justify-content-center w-100 bg-dark">
        <img
          className=""
          src={logo}
          alt="logo"
          height="350"
          width={document.body.clientWidth / 2}
        />
      </div>
      {console.log("parent reload")}
      <div id="movieOptions" className="bg-dark">
        <Search parentMethod={searchByKeyWord} />
      </div>

      <div className="row d-flex flex-wrap justify-content-center w-100 mx-0 my-2">
        <div className="col-md-4 bg-light pt-2">
          <Sources parentMethod={switchCategory} category={category} />
          <br></br>
          <Reorder parentMethod={sortByValue} />
          {/* <button onClick={toggleModalMethod}>Open Modal</button> why you put Modal here dude? */}
        </div>
        <ReactModal
          closeTimeoutMS={1500}
          isOpen={toggleModal}
          onRequestClose={() => setToggleModal(false)}
          style={{
            overlay: {
              display: "flex",
              justifyContent: "center"
            },
            contents: { width: "70%", height: "70%" }
          }}
        >
          <YouTube video={modalVideoID} height="100%" width="100%" autoplay />
        </ReactModal>
        <div className="col-md-8 m-0 bg-light">
          {movies !== undefined &&
            movies.length !== 0 &&
            movies.map((item, index) => {
              return (
                <Movie
                  className="example"
                  img={item.poster_path}
                  title={item.title}
                  year={moment(item.release_date).format("YYYY")}
                  rating={item.vote_average}
                  description={item.overview}
                  popularity={item.popularity}
                  releaseDate={item.release_date}
                  parentMethod={toggleModalMethod}
                  itemId={item.id}
                />
              );
            })}
        </div>
      </div>
      {totalPages !== 0 && (
        <Pagination
          parentMethod={switchPage}
          page={pageNum}
          totalPages={totalPages}
        />
      )}
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
