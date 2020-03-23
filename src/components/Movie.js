import React from "react";
import { Card, Collapse } from "react-bootstrap";

export default class Movie extends React.Component {
  constructor() {
    super();
    this.state = {
      state: false,
      onLoad: false
    };
  }
  myCallback = event => {
    console.log("opening");
    this.props.parentMethod(this.props.itemId);
  };

  componentDidMount() {
    this.setState({ onLoad: !this.state.onLoad });
  }

  render() {
    return (
      <div className="bg-info my-2 border border-secondary rounded shadow-lg">
        <div className="row " style={{}}>
          <Card.Img
            className="img-fluid col-md-4"
            style={{ height: "400px", width: "200px" }}
            variant="top"
            src={`http://image.tmdb.org/t/p/w342/${this.props.img}`}
          />
          <Card.Body className="col-md-8">
            <Card.Title>
              {this.props.title} ({this.props.year})
            </Card.Title>
            <Card.Text className="pr-3 pt-2">
              {this.props.description}
            </Card.Text>
            <button onClick={() => this.myCallback(this.props.movie_id)}>Open Modal</button>
            <button
              onClick={() => this.setState({ state: !this.state.state })}
              type="button"
              className="btn btn-primary"
            >
              See More
            </button>
            <Collapse in={this.state.state}>
              <div className="mt-3 ml-1 row">
                <div className="col-md-6">
                  <Card.Title>Rating: {this.props.rating}</Card.Title>
                  <Card.Title>Popularity: {this.props.popularity}</Card.Title>
                </div>
                <div className="col-md-6">
                  Release Date: {this.props.releaseDate}
                </div>
              </div>
            </Collapse>
          </Card.Body>
        </div>
      </div>
    );
  }
}
