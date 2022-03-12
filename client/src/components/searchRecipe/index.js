import React from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import RecipeList from "../RecipeList";

const SearchRecipes = () => {
    return (
        <Container fluid>
            <h1 category={currentCategory}></h1>
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