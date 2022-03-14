import React from "react";
import { Card, ListGroup, Row, Spinner } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { QUERY_RECIPES } from "../../utils/queries";
import "bootstrap/dist/css/bootstrap.min.css";
import "./recipeList.css";

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
            <Spinner animation="border" />
          ) : (
            queriedRecipes.map((recipe) =>{
              return (
                <Card>
              {/* <Card.Img variant="top" alt="recipe card img" /> */}
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Text>Difficulty: {recipe.difficulty}</Card.Text>
                <Card.Subtitle>Prep Time: {recipe.prepTime}</Card.Subtitle>
                <Card.Subtitle>Cook Time: {recipe.cookTime}</Card.Subtitle>

                <ListGroup variant="flush">
                  {recipe.ingredients.map((ingredients) => {
                    return (
                      <ListGroup.Item>{ingredients}</ListGroup.Item>
                    )
                  })}
                </ListGroup>
                
                <Card.Text>Prep Instructions: {recipe.prepInstructions}</Card.Text>
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
