import React from "react";
import { Card, ListGroup, Row, Spinner } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { QUERY_RECIPES } from "../../utils/queries";
import "bootstrap/dist/css/bootstrap.min.css";
import "./recipeList.css";
import ReactTextCollapse from "react-text-collapse";
const TEXT_COLLAPSE_OPTIONS = {
  collapse: false, // default state when component rendered
  collapseText: '... show more', // text to show when collapsed
  expandText: 'show less', // text to show when expanded
  minHeight: 100, // component height when closed
  maxHeight: 150, // expanded to
  textStyle: { // pass the css for the collapseText and expandText here
    color: "blue",
    fontSize: "20px"
  }
}

const RecipeList = (props) => {
  // get data from db to populate cards
  const { loading, data } = useQuery(QUERY_RECIPES);
  // if data exists, store in queriedRecipes const
  const queriedRecipes = data?.recipes || [];
  console.log(queriedRecipes);
  return (
    <Row className="card-row d-flex flex-row flex-wrap justify-content-around gy-4">

      {// map recipes to return cards, remember to add a key
        loading ? (
          <Spinner animation="border" />
        ) : (
          queriedRecipes.map((recipe) => {
            return (
              <Card className="card col-xs-12 col-sm-6 col-md-3 col-lg-2 col-xl-1">
                {/* <Card.Img variant="top" alt="recipe card img" /> */}
                <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                  <Card.Text><strong>Difficulty:</strong> {recipe.difficulty}</Card.Text>
                  <Card.Subtitle><strong>Prep Time:</strong> {recipe.prepTime}</Card.Subtitle>
                  <Card.Subtitle><strong>Cook Time:</strong> {recipe.cookTime}</Card.Subtitle>

                  <ListGroup variant="flush">
                    {recipe.ingredients.map((ingredients) => {
                      return (
                        <ListGroup.Item>{ingredients}</ListGroup.Item>
                      )
                    })}
                  </ListGroup>

                  <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
                    <Card.Text><strong>Prep Instructions:</strong> {recipe.prepInstructions}</Card.Text>
                  </ReactTextCollapse>
                </Card.Body>
              </Card>
            )
          })
        )}
    </Row>
  );
};


export default RecipeList;
