import React from "react";
import { Card, ListGroup, Row, Spinner } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { QUERY_RECIPES } from "../../utils/queries";
import "bootstrap/dist/css/bootstrap.min.css";
import "./recipeList.css";
import ReactTextCollapse from "react-text-collapse";
const TEXT_COLLAPSE_OPTIONS = {
  collapse: false, // default state when component rendered
  collapseText: "... show more", // text to show when collapsed
  expandText: "show less", // text to show when expanded
  minHeight: 100, // component height when closed
  maxHeight: 150, // expanded to
  textStyle: {
    // pass the css for the collapseText and expandText here
    color: "blue",
    fontSize: "20px",
  },
};

const RecipeList = (props) => {
  const {
    id,
    title,
    difficulty,
    prepInstructions,
    prepTime,
    cookTime,
    ingredients,
  } = props;
  // get data from db to populate cards
  // const { loading, data } = useQuery(QUERY_RECIPES);
  // // if data exists, store in queriedRecipes const
  // const queriedRecipes = data?.recipes || [];
  // console.log(queriedRecipes);
  return (
    <Row className="flex-row">
      <Card id={id}>
        {/* <Card.Img variant="top" alt="recipe card img" /> */}
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>Difficulty: {difficulty}</Card.Text>
          <Card.Subtitle>Prep Time: {prepTime}</Card.Subtitle>
          <Card.Subtitle>Cook Time: {cookTime}</Card.Subtitle>

          <ListGroup variant="flush">
            {ingredients.map((ingredient) => {
              return <ListGroup.Item>{ingredient}</ListGroup.Item>;
            })}
          </ListGroup>

          <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
            <Card.Text>Prep Instructions: {prepInstructions}</Card.Text>
          </ReactTextCollapse>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default RecipeList;
