import React from "react";
import { CSSTransition } from "react-transition-group";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Collapse
} from "react-bootstrap";
import "../css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

let boolean = true;
//for images from imdb, there sizes come in: "w92", "w154", "w185", "w342", "w500", "w780", or "original";
export default class Movie extends React.Component {
  constructor() {
    super();
    this.state = {
      state: false,
      onLoad: false
    };
  }

  componentDidMount() {
    this.setState({ onLoad: !this.state.onLoad });
  }
  shouldComponentUpdate(nextProps, nextState) {
    //this method returns true to authorize an update
    return true;
  }

  render() {
    return (
      <div>
        <CSSTransition
          classNames="example"
          timeout={700}
          in={this.state.onLoad}
        >
          <div>
            <Card style={{ width: "26rem" }}>
              <Card.Img
                className="img-fluid"
                style={{ height: "300px", width: "200px" }}
                variant="top"
                src={`http://image.tmdb.org/t/p/w342/${this.props.img}`}
              />
              <Card.Body>
                <Card.Title>
                  {this.props.title} ({this.props.year})
                </Card.Title>
                <button
                  onClick={() => this.setState({ state: !this.state.state })}
                  type="button"
                  className="btn btn-primary"
                >
                  See More
                </button>
                <Collapse in={this.state.state}>
                  <div>
                    <Card.Title>Rating: {this.props.rating}</Card.Title>
                    <Card.Text>{this.props.description}</Card.Text>
                  </div>
                </Collapse>
              </Card.Body>
            </Card>
          </div>
        </CSSTransition>
      </div>
    );
  }
}
