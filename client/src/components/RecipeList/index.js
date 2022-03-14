import React from "react";
import { Card, ListGroup, Row } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { QUERY_RECIPES } from "../../utils/queries";
import "bootstrap/dist/css/bootstrap.min.css";

const RecipeList = (props) => {
  // get data from db to populate cards
  const { loading, data } = useQuery(QUERY_RECIPES);
  // if data exists, store in queriedRecipes const
  const queriedRecipes = data?.recipes || [];
  console.log(queriedRecipes);
  return (
    <Row className="flex-row">
      {
        // map recipes to return cards, remember to add a key
        <>
          {loading ? (
            <div>Loading...</div>
          ) : (
            queriedRecipes.map((recipe) =>{
              return (
                <Card>
              <Card.Img variant="top" alt="recipe card img" />
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Subtitle>
                  difficulty | prep time | cook time
                </Card.Subtitle>
                <ListGroup variant="flush">
                  {recipe.ingredients.map((ingredient) => {
                    return (
                      <ListGroup.Item>{ingredient}</ListGroup.Item>
                    )
                  })}
                </ListGroup>
                <Card.Text>These are the prep instructions</Card.Text>
              </Card.Body>
            </Card>
              )
            })
          )}
        </>
      }
    </Row>
  );
};

export default RecipeList;
