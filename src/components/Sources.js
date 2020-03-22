import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class Sources extends Component {
  myCallback = event => {
    this.props.parentMethod(event);
  };

  render() {
    return (
      <div className="d-flex mx-0 row w-100 bg-dark justify-content-center">
        <Button
          className="col-md-1"
          onClick={this.myCallback}
          value="now_playing"
        >
          Now Playing
        </Button>
        <Button
          className="col-md-1   "
          onClick={this.myCallback}
          value="popular"
        >
          Popular
        </Button>
        <Button
          className="col-md-1"
          onClick={this.myCallback}
          value="top_rated"
        >
          Top Rated
        </Button>
        <Button
          className="col-md-1   "
          onClick={this.myCallback}
          value="upcoming"
        >
          Upcoming
        </Button>
        <span className="text-light ml-2" style={{ fontSize: "24px" }}>
          You are on {this.props.category}
        </span>
      </div>
    );
  }
}
