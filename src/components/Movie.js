import React, { useState } from "react";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Collapse
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//for images from imdb, there sizes come in: "w92", "w154", "w185", "w342", "w500", "w780", or "original";
export default function Movie(props) {
  let [state, setState] = useState(false);

  return (
    <div>
      <Card style={{ width: "26rem" }}>
        <Card.Img
          variant="top"
          src={`http://image.tmdb.org/t/p/w342/${props.img}`}
        />
        <Card.Body>
          <Card.Title>
            {props.title} ({props.year})
          </Card.Title>
          <button
            onClick={() => setState(!state)}
            type="button"
            class="btn btn-primary"
          >
            Button with data-target
          </button>
          <Collapse in={state}>
            <div>
              <Card.Title>Rating: {props.rating}</Card.Title>
              <Card.Text>{props.description}</Card.Text>
            </div>
          </Collapse>
        </Card.Body>
      </Card>
    </div>
  );
}
