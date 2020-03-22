import React, { Component } from "react";
import { Nav, FormControl, Button } from "react-bootstrap";

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      keyword: ""
    };
  }
  render() {
    return (
      <div className="d-flex w-100 m-0 justify-content-center">
        <FormControl
          className="w-25"
          placeholder="search"
          onChange={e => (this.state.keyword = e.target.value)}
        />
        <Button onClick={() => this.props.parentMethod(this.state.keyword)}>
          Search!
        </Button>
      </div>
    );
  }
}
