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
    this.props.parentMethod(event); //gets the id, to indicate to the parent what page to go to
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
      this.setState({
        arrayOfPages: this.setButtons()
      });
    }
    // this.setButtons();
  }
  //this.props.pages & totalPages
  render() {
    return (
      <div
        id="pagination-id"
        className="row bg-dark w-100 m-0 p-3"
        style={{ height: "150px" }}
      >
        <div className="col-md-6"></div>
        <div className="col-md-6">
          <div className="row w-100 text-center pr-3 mb-2">
            <p className="text-light m-auto" style={{ fontSize: "16px" }}>
              You are on page: {this.props.page} out of {this.props.totalPages}
            </p>
          </div>
          <div className="d-flex w-100 bg-dark pr-3 m-auto">
            <Button
              className={`${
                this.props.page <= 5 ? "myHidden" : ""
              } pagination-buttons styledButtons flex-grow-1`}
              onClick={this.updatePagination}
              value="previous-5"
            >
              Prev 5
            </Button>
            <Button
              className={`${
                this.props.page <= 1 ? "myHidden" : ""
              } pagination-buttons styledButtons flex-grow-1`}
              onClick={this.updatePagination}
              value="previous"
            >
              Prev
            </Button>
            {this.state.arrayOfPages.length !== 0 &&
              this.state.arrayOfPages.map((item, index) => {
                return (
                  <Button
                    className={`${
                      item === this.props.page
                        ? "bg-light border-light text-dark"
                        : ""
                    } pagination-buttons styledButtons flex-grow-1`}
                    size="lg"
                    onClick={this.updatePagination}
                    value={item}
                  >
                    {item}
                  </Button>
                );
              })}
            <Button
              className={`${
                this.props.page >= this.props.totalPages ? "myHidden" : ""
              } .pagination-buttons styledButtons flex-grow-1`}
              onClick={this.updatePagination}
              value="next"
            >
              Next
            </Button>
            <Button
              className={`${
                this.props.page >=
                1 + this.props.totalPages - (this.props.totalPages % 5)
                  ? "myHidden"
                  : ""
              } .pagination-buttons styledButtons flex-grow-1`}
              onClick={this.updatePagination}
              value="next-5"
            >
              Next 5
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
