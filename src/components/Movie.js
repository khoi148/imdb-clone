import React from "react";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//for images from imdb, there sizes come in: "w92", "w154", "w185", "w342", "w500", "w780", or "original";
export default function Movie(props) {
  return (
    <div>
      <Card style={{ width: "26rem", height: "auto" }}>
        <Card.Img
          variant="top"
          src={`http://image.tmdb.org/t/p/w342/${props.img}`}
        />
        <Card.Body>
          <Card.Title>
            {props.title} ({props.year})
          </Card.Title>
          <Card.Title>Rating: {props.rating}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <Button variant="primary">See More</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
