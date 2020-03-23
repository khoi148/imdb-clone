import React, { Component } from "react";
import { Button } from "react-bootstrap";

//TODO: note fontawesome icons not showing up. bug
export default class Reorder extends Component {
  constructor() {
    super();
    this.state = { value1: null, value2: null };
  }
  myCallback = event => {
    this.props.parentMethod(event);
  };
  render() {
    return (
      <div className="m-0 p-3 bg-dark border border-light rounded">
        <div className="row">
          <span className="text-light m-auto" style={{ fontSize: "24px" }}>
            Show First
          </span>
        </div>

        <div className="d-flex flex-column m-0">
          <Button
            className="styledButtons"
            onClick={this.myCallback}
            value="most_popular"
          >
            Most Popular
          </Button>
          <Button
            className="styledButtons"
            onClick={this.myCallback}
            value="least_popular"
          >
            Least Popular
          </Button>
          <Button
            className="styledButtons"
            onClick={this.myCallback}
            value="highest_rated"
          >
            Highest Rated
          </Button>
          <Button
            className="styledButtons"
            onClick={this.myCallback}
            value="lowest_rated"
          >
            Least Rated!
          </Button>
        </div>
      </div>
    );
  }
}
