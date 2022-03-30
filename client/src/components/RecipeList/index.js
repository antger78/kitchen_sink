import React, { useEffect, useState } from "react";
import { Card, Col, ListGroup, Alert, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useMutation } from "@apollo/client";
import "./recipeList.css";
import {
  MUTATION_LIKERECIPE,
  MUTATION_REMOVELIKE,
} from "../../utils/mutations";
import { QUERY_KEYWORDRECIPE, QUERY_FAVORITERECIPES } from "../../utils/queries";
import Auth from "../../utils/auth";
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
    fontSize: "1.25rem",
  },
};

const RecipeList = (props) => {
  const {
    id,
    author,
    title,
    difficulty,
    prepInstructions,
    prepTime,
    cookTime,
    ingredients,
    likesCount,
    userLikes,
  } = props;
  // const [sendError, setSendError] = useState(false);

  // initial state of liked: false
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (Auth.loggedIn()) {
      console.log(userLikes);
      if (userLikes?.some((like) => like._id === Auth.getProfile().data._id)) {
       setIsLiked(true);
      }
    }
  }, [likesCount]);

  // mutations
  const [addLike] = useMutation(MUTATION_LIKERECIPE, {
    options: { awaitRefetchQuesries: true }
  });

  const [removeLike] = useMutation(MUTATION_REMOVELIKE, {
    options: { awaitRefetchQuesries: true }
  })

  // handle add like
  const handleAddLike = async () => {
    try {
      await addLike({ variables: { _id: id } });
      setIsLiked(true);
    } catch (err) {
      console.log(err);
      // setSendError(true);
    }
    // window.location.reload();
  };

  // handle remove like
  const handleRemoveLike = async () => {
    try {
      await removeLike({ variables: { _id: id } });
      setIsLiked(false);
    } catch(err) {
      console.log(err);
    }
    // window.location.reload();
  };

  return (
    <Col className="my-2">
    <Card
      // className="card col-xs-12 col-sm-6 col-md-3 col-lg-2 col-xl-1"
      key={id}
    >
      {/* <Alert
        dismissible
        onClose={() => setSendError(false)}
        show={sendError}
        variant="danger"
      >
        Something went wrong...
      </Alert> */}
      {/* <Card.Img variant="top" alt="recipe card img" /> */}
      <Card.Header>
					<Card.Title as="h4">
          {title}
        </Card.Title>
        {Auth.loggedIn() ? (
          <h5>
          {isLiked ? (
            <a href="#!" className="text-danger">
              <i
                className="fa-solid fa-heart text-danger"
                onClick={handleRemoveLike}
              >
              </i>
            </a>
          ) : (
            <a href="#!" className="text-secondary">
              <i className="fa-solid fa-heart" onClick={handleAddLike}></i>
            </a>
          )}
          </h5>
        ) : (
          ""
        )}

        <Card.Subtitle>by {author}</Card.Subtitle>
        {likesCount === 1 ? (
          <p>{likesCount} person likes this recipe</p>
        ) : (
          <p>{likesCount} people like this recipe</p>
        )}
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Difficulty:</strong> {difficulty}
        </Card.Text>
        <Card.Subtitle>
          <strong>Prep Time:</strong> {prepTime} | <strong>Cook Time:</strong>{" "}
          {cookTime}
        </Card.Subtitle>
        <Card.Subtitle></Card.Subtitle>

        <ListGroup variant="flush">
          {ingredients.map((ingredient, i) => {
            return <ListGroup.Item key={i}>{ingredient}</ListGroup.Item>;
          })}
        </ListGroup>

        <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
          <Card.Text>
            <strong>Prep Instructions:</strong> {prepInstructions}
          </Card.Text>
        </ReactTextCollapse>
      </Card.Body>
    </Card>
    </Col>
  );
};

export default RecipeList;
