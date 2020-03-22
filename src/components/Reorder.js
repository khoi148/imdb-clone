import React, { Component } from "react";
import { Nav, FormControl, Button } from "react-bootstrap";

export default class Reorder extends Component {
  constructor() {
    super();
    this.state = {};
  }
  myCallback = event => {
    this.props.parentMethod(event);
  };
  render() {
    return (
      <div className="d-flex w-100 m-0 bg-dark justify-content-center">
        <span className="text-light" style={{ fontSize: "24px" }}>
          Show First:
        </span>
        <Button onClick={this.myCallback} value="most_popular">
          Most Popular <i class="fa fa-arrow-up" aria-hidden="true"></i>
        </Button>
        <Button onClick={this.myCallback} value="least_popular">
          Least Popular <i class="fa fa-arrow-down" aria-hidden="true"></i>
        </Button>
        <Button onClick={this.myCallback} value="highest_rated">
          Highest Rated <i class="fa fa-arrow-up" aria-hidden="true"></i>
        </Button>
        <Button onClick={this.myCallback} value="lowest_rated">
          Least Rated <i class="fa fa-arrow-down" aria-hidden="true"></i>
        </Button>
      </div>
    );
  }
}
