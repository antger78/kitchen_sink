//add recipe form
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { MUTATION_ADDRECIPE } from "../../utils/mutations";

import Auth from "../../utils/auth";


const RecipeForm = () => {
    const [recipeFormData, setRecipeFormData] = useState({ title: "", ingredients: "", prepInstructions: "", prepTime: "", cookTime: "", difficulty: "" });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [recipe] = useMutation(MUTATION_ADDRECIPE);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRecipeFormData({ ...recipeFormData, [name]: value });
      };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
            // check if form has everything (as per react-bootstrap docs)
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            }
            try {
            const { data } = await recipe({ variables: { ...recipeFormData } });
            }catch(err){
                console.error(err);
                setShowAlert(true);
            }

            setRecipeFormData({
                title: "", 
                ingredients: "", 
                prepInstructions: "", 
                prepTime: "", 
                cookTime: "", 
                difficulty: ""
            });
        };

        return(
            <>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your recipe input!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor="title">Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Recipe Title"
            name="title"
            onChange={handleInputChange}
            value={recipeFormData.title}
            required
          />
          <Form.Control.Feedback type="invalid">
            Your Recipe needs a Title!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="ingredients">Ingredients</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingredient List"
            name="ingredients"
            onChange={handleInputChange}
            value={recipeFormData.ingredients}
          />
          <Form.Control.Feedback type="invalid">
            Please add some ingredients!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="prepInstructions">Prep Instructions</Form.Label>
          <Form.Control
            type="text"
            placeholder="Prep Instructions"
            name="prepInstructions"
            onChange={handleInputChange}
            value={recipeFormData.prepInstructions}
          />
          <Form.Control.Feedback type="invalid">
            We need some prep instructions!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="cookTime">Cook Time</Form.Label>
          <Form.Control
            type="text"
            placeholder="Cook Time"
            name="cookTime"
            onChange={handleInputChange}
            value={recipeFormData.cookTime}
            required
          />
          <Form.Control.Feedback type="invalid">
            How long does your dish take to cook?
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="difficulty">Difficulty</Form.Label>
          <Form.Control
            type="text"
            placeholder="Difficulty"
            name="difficulty"
            onChange={handleInputChange}
            value={recipeFormData.difficulty}
            required
          />
          <Form.Control.Feedback type="invalid">
            How tough is your recipe!
          </Form.Control.Feedback>
        </Form.Group>

            </Form>


        
            </>
        )

             
};
