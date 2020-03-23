import React, { Component } from "react";
import { FormControl, Button } from "react-bootstrap";

export default class Search extends Component {
  render() {
    return (
      <div className="d-flex flex-row-reverse w-100 m-0 py-3">
        <Button
          className="ml-2 mr-3 styledButtons"
          onClick={() =>
            this.props.parentMethod(document.getElementById("searchBar").value)
          }
        >
          Search!
        </Button>
        <FormControl
          className="w-50 border-bottom border-light rounded-0"
          placeholder="search"
          id="searchBar"
          style={{ background: "transparent", border: "none", color: "white" }}
        />
      </div>
    );
  }
}
