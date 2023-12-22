import React from "react";
import Card from "react-bootstrap/Card";

const Movie = ({ movie }) => {
  return (
    <div>
      <Card  style={{ width: "18rem" }}>
        <Card.Img variant="top" src={movie.Poster} />
        <Card.Body style={{color:"white"}}>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Year}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Movie;
