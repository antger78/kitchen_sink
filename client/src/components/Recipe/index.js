import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

import image from '../../../public/logo512.png';

const RecipeCard = () => {
    
    return (
        <Card>
            <Card.Img variant='top' src={image} />
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
    )
};

export default RecipeCard;