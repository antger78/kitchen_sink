import React, { useState } from "react";
import { Button, Container, Form, Row, Spinner } from "react-bootstrap";
import RecipeList from "../RecipeList";
import { useQuery } from "@apollo/client";
import { QUERY_KEYWORDRECIPE, QUERY_RECIPES } from "../../utils/queries";

const RecipeContainer = () => {
  // const heading = props.currentCategory;
  // const {category} = props;
  // if category is home, initial state is popular posts
  // search (iwll be function) will repopulate with search results (new state)
  // if category is yours, populate with recipes matching username/id
  // if category is liked, populate with recipes user has liked
  // update the user model with field 'likedRecipe':[{obj id refs: recipes}] for queries
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { loading, data } = useQuery(QUERY_RECIPES);
  // if data exists, store in queriedRecipes const
  const queriedRecipes = data?.recipes || [];
  //   setSearchedRecipes(queriedRecipes);
  console.log(queriedRecipes);

  const { refetch } = useQuery(QUERY_KEYWORDRECIPE, {
    variables: { input: searchInput },
  });
  console.log(searchedRecipes);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(searchInput);
    const { loading, data } = refetch();
    const Recipes = data?.keywordRecipe || [];
    if (!loading) {
      setSearchedRecipes(Recipes);
    }
  };

  return (
    <Container fluid>
      {/* <h1>{category}</h1> */}
      <Row>
        <Form>
          <Form.Group>
            <Form.Label>Looking for something specific?</Form.Label>
            <Form onSubmit={handleFormSubmit}>
              <Form.Control
                name="searchInput"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                placeholder="Search for a recipe"
              />
              <Button type="submit">Submit Search</Button>
            </Form>
            {/* <Form.Control type="text" name="search_term" />
                                <Button type='submit'>Search Recipes</Button> */}
          </Form.Group>
        </Form>
      </Row>
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
            />
          );
        })
      )}
    </Container>
  );
  // }
};

export default RecipeContainer;
