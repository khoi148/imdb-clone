import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class Sources extends Component {
  myCallback = event => {
    this.props.parentMethod(event);
  };

  render() {
    return (
      <div className="d-flex mx-0 row w-100 bg-warning justify-content-center">
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
        <span>You are on {this.props.category}</span>
      </div>
    );
  }
}
