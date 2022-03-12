import React from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import RecipeList from "../RecipeList";

const RecipeContainer = (props) => {
    // const heading = props.currentCategory;
    const {category} = props;
    // if category is home, initial state is popular posts
        // search (iwll be function) will repopulate with search results (new state)
    // if category is yours, populate with recipes matching username/id
    // if category is liked, populate with recipes user has liked
        // update the user model with field 'likedRecipe':[{obj id refs: recipes}] for queries

    return (
        <Container fluid>
            <h1>{category}</h1>
            <Row>
                <Form>
                    <Form.Group>
                        <Form.Label>Looking for something specific?</Form.Label>
                        <Form.Control type="text" name="search_term" />
                        <Button type='submit'>Search Recipes</Button>
                    </Form.Group>
                </Form>
            </Row>
            <RecipeList />
        </Container>
    )
}

export default RecipeContainer;