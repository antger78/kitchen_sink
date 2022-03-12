import React from 'react';
import { Card, ListGroup, Row } from 'react-bootstrap';

const RecipeList = (props) => {

    return (
        <Row className='flex-row'>
            {// map recipes to return cards, remember to add a key
                <Card>
                    <Card.Img variant='top' alt='recipe card img' />
                    <Card.Body>
                        <Card.Title>My Great Recipe</Card.Title>
                        <Card.Subtitle>difficulty | prep time | cook time</Card.Subtitle>
                        <ListGroup variant="flush">
                            <ListGroup.Item>ingredient 1</ListGroup.Item>
                            <ListGroup.Item>ingredient 2</ListGroup.Item>
                        </ListGroup>
                        <Card.Text>
                            These are the prep instructions
                        </Card.Text>
                    </Card.Body>
                </Card>
            }
        </Row>
    )
};

export default RecipeCard;