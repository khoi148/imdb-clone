import React, { Component } from "react";
import { FormControl, Button } from "react-bootstrap";

export default class Search extends Component {
  render() {
    return (
      <div className="d-flex w-100 m-0 justify-content-center">
        <FormControl className="w-25" placeholder="search" id="formControl1" />
        <Button
          onClick={() =>
            this.props.parentMethod(
              document.getElementById("formControl1").value
            )
          }
        >
          Search!
        </Button>
      </div>
    );
  }
}
