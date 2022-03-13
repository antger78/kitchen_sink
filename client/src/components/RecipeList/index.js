import React from "react";
import { Card, ListGroup, Row } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { QUERY_RECIPES } from "../../utils/queries";

const RecipeList = (props) => {
  // get data from db to populate cards
  const { loading, data } = useQuery(QUERY_RECIPES, {
    variables: { first: 10 },
  });
  // if data exists, store in queriedRecipes const
  const queriedRecipes = data?.recipes || [];
  console.log(data, queriedRecipes);
  return (
    <Row className="flex-row">
      {
        // map recipes to return cards, remember to add a key
        <Card>
          <Card.Img variant="top" alt="recipe card img" />
          <Card.Body>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <Card.Title title={data.queriedRecipes.title} />
            )}
            <Card.Subtitle>difficulty | prep time | cook time</Card.Subtitle>
            <ListGroup variant="flush">
              <ListGroup.Item>ingredient 1</ListGroup.Item>
              <ListGroup.Item>ingredient 2</ListGroup.Item>
            </ListGroup>
            <Card.Text>These are the prep instructions</Card.Text>
          </Card.Body>
        </Card>
      }
    </Row>
  );
};

export default RecipeList;
