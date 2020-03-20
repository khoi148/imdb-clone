import React from "react";
import { Button } from "react-bootstrap";

export default class Pagination extends React.Component {
  constructor() {
    super();
    this.state = {
      arrayOfPages: []
    };
  }
  updatePagination = event => {
    let currentNum = this.props.parentMethod(event); //gets the id, to indicate to the parent what page to go to
    // currentNum gets us the next page number
  };
  setButtons = () => {
    let array = [];
    let upperLimit = 5 * Math.ceil(this.props.page / 5);
    console.log(upperLimit);
    let base = upperLimit - 4;
    if (upperLimit > this.props.totalPages) upperLimit = this.props.totalPages;

    for (let x = base; x <= upperLimit; x++) {
      array.push(x);
    }
    console.log("setButtons x");
    return array;
  };

  componentWillMount() {
    // this.setState({ page: this.props.page });
  }
  componentDidMount() {
    this.setState({ arrayOfPages: this.setButtons() });
  }

  componentWillUpdate(nextProps, nextState) {
    // console.log(this.state.page, this.state.arrayOfPages[4], nextProps.page);
    // this.setState({ page: this.props.page });
    if (
      nextProps.page > this.state.arrayOfPages[4] ||
      nextProps.page < this.state.arrayOfPages[0]
    ) {
      console.log(nextProps.page);
      this.setState({
        arrayOfPages: this.setButtons()
      });
    }
    // this.setButtons();
  }
  //this.props.pages & totalPages
  render() {
    return (
      <div>
        <Button onClick={this.updatePagination} value="previous-5">
          Previous 5
        </Button>
        <Button onClick={this.updatePagination} value="previous">
          Previous
        </Button>
        {this.state.arrayOfPages.length !== 0 &&
          this.state.arrayOfPages.map((item, index) => {
            return (
              <Button
                className={`${
                  item == this.props.page ? "bg-success border-success" : ""
                }`}
                onClick={this.updatePagination}
                value={item}
              >
                {item}
              </Button>
            );
          })}
        <Button onClick={this.updatePagination} value="next">
          Next
        </Button>
        <Button onClick={this.updatePagination} value="next-5">
          Next 5
        </Button>
        <span>You are on page: {this.props.page}</span>
      </div>
    );
  }
}
