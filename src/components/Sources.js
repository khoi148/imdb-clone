import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "../css/App.css";

export default class Sources extends Component {
  myCallback = event => {
    this.props.parentMethod(event);
  };

  render() {
    return (
      <div className="bg-dark border border-light rounded p-3">
        <div className="row m-0">
          <span className="text-light m-auto" style={{ fontSize: "24px" }}>
            You are on {this.props.category}
          </span>
        </div>
        <div className="d-flex flex-column m-2">
          <Button
            className="styledButtons mr-2"
            onClick={this.myCallback}
            value="now_playing"
          >
            Now Playing
          </Button>
          <Button
            className="styledButtons mr-2"
            onClick={this.myCallback}
            value="popular"
          >
            Popular
          </Button>
          <Button
            className="styledButtons mr-2"
            onClick={this.myCallback}
            value="top_rated"
          >
            Top Rated
          </Button>
          <Button
            className="styledButtons mr-2"
            onClick={this.myCallback}
            value="upcoming"
          >
            Upcoming
          </Button>
        </div>
      </div>
    );
  }
}
