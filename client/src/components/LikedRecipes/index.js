import React, { useState, useEffect } from "react";
import { Container, Form, Row, Spinner, InputGroup } from "react-bootstrap";
import RecipeList from "../RecipeList";
import { useQuery } from "@apollo/client";
import { QUERY_FAVORITERECIPES } from "../../utils/queries";

const LikedRecipes = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { loading, data } = useQuery(QUERY_FAVORITERECIPES, {
    variables: { input: searchInput },
  });

  useEffect(() => {
    if (data) {
      setSearchedRecipes(data.userFavoriteRecipes.likedRecipes);
    }
  }, [data]);

  return (
    <Container fluid>
      <h4>Your Favorite Recipes!</h4>
      {/* <Row>
        <InputGroup>
          <InputGroup.Text>Looking for something specific?</InputGroup.Text>
          <Form.Control
            name="searchInput"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            placeholder="Search for a recipe"
          />
        </InputGroup>
      </Row> */}
      <Row xs={1} md={2} lg={3}>
        {loading ? (
          <Spinner animation="border" />
        ) : (
          searchedRecipes.map((recipe) => {
            return (
              <RecipeList
                key={recipe._id}
                id={recipe._id}
                title={recipe.title}
                difficulty={recipe.difficulty}
                prepInstructions={recipe.prepInstructions}
                prepTime={recipe.prepTime}
                cookTime={recipe.cookTime}
                ingredients={recipe.ingredients}
                author={recipe.author}
                likesCount={recipe.likesCount}
                userLikes={recipe.userLikes}
              />
            );
          })
        )}
      </Row>
    </Container>
  );
};

export default LikedRecipes;
