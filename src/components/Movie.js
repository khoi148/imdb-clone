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
      <div className="row bg-light m-2 mb-3 border border-secondary rounded shadow-lg">
        <Card.Img
          onClick={() => this.myCallback(this.props.movie_id)}
          className="img-fluid col-4 p-0"
          style={{ height: "400px", width: "200px" }}
          variant="top"
          src={`http://image.tmdb.org/t/p/w342/${this.props.img}`}
        />
        <Card.Body className="col-8">
          <Card.Title>
            {this.props.title} ({this.props.year})
          </Card.Title>
          <Card.Text className="pr-3 pt-2">{this.props.description}</Card.Text>
          <button
            onClick={() => this.setState({ state: !this.state.state })}
            type="button"
            className="btn btn-primary"
          >
            See More
          </button>
          <button
            onClick={() => this.myCallback(this.props.movie_id)}
            type="button"
            className="btn btn-primary ml-3"
          >
            See Trailer
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
    );
  }
}
