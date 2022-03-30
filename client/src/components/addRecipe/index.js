//add recipe form
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { MUTATION_ADDRECIPE } from "../../utils/mutations";
import { QUERY_RECIPES } from "../../utils/queries";
import Auth from "../../utils/auth";
import { useHistory } from "react-router-dom";
import "./addRecipe.css";

const RecipeForm = () => {
	const history = useHistory();
	const redirect = () => {
		history.push("/your-recipes");
	};
	const [recipeFormData, setRecipeFormData] = useState({
		title: "",
		// Ingredients should have objects {id: string, name: string}
		// ingredients: [],
		prepInstructions: "",
		prepTime: 0,
		cookTime: 0,
		difficulty: "",
	});
	const [validated] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [recipe] = useMutation(MUTATION_ADDRECIPE, {
		refetchQueries: [QUERY_RECIPES],
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		if (isNaN(value)) {
			setRecipeFormData({ ...recipeFormData, [name]: value });
		} else {
			setRecipeFormData({ ...recipeFormData, [name]: Number(value) });
		}
	};

	const handleIngredientsInputChange = (e, index) => {
		const {
			//  name,
			value,
		} = e.target;
		const list = [...inputList];
		console.log(list);
		list[index] = value;
		setInputList(list);
	};

	// handle click event of the Remove button
	const handleRemoveClick = (index) => {
		const list = [...inputList];
		list.splice(index, 1);
		setInputList(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setInputList([...inputList, ""]);
	};

	const [inputList, setInputList] = useState([""]);

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		// console.log("IS THIS SUBMITTING?");
		// check if form has everything (as per react-bootstrap docs)
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		try {
			console.log(inputList);
			const { data } = await recipe({
				variables: { ...recipeFormData, ingredients: inputList },
			});
		} catch (err) {
			console.error(err);
			setShowAlert(true);
		}

		setRecipeFormData({
			title: "",
			ingredients: [],
			prepInstructions: "",
			prepTime: 0,
			cookTime: 0,
			difficulty: "",
		});
		redirect();
		window.location.reload();
	};

	return (
		<>
			<Form
				noValidate
				validated={validated}
				onSubmit={handleFormSubmit}
				className="mx-2"
			>
				<Alert
					dismissible
					onClose={() => setShowAlert(false)}
					show={showAlert}
					variant="danger"
				>
					Something went wrong with your recipe input!
				</Alert>

				{/* title area */}
				<Form.Group>
					<row className="row-box my-2">
						<Form.Label htmlFor="title" className="mx-auto my-auto title">
							Title
						</Form.Label>
						<Form.Control
							className="title-input align-self-end"
							type="text"
							placeholder="Recipe Title"
							name="title"
							onChange={handleInputChange}
							value={recipeFormData.title}
							required
						/>
					</row>
					<Form.Control.Feedback type="invalid">
						Your Recipe needs a Title!
					</Form.Control.Feedback>
				</Form.Group>

				{/* ingredient area */}
				<Form.Group className="mx-1 my-2">
					<row className="row-box">
						<Form.Label
							htmlFor="ingredients"
							className="my-auto align-self-start"
						>
							Ingredients
						</Form.Label>
						{inputList.map((ingredient, i) => {
							return (
								<row className="row-box my-2">
									<Form.Control
										className="ingredient-input"
										as="input"
										type="text"
										placeholder="Enter an Ingredient"
										name="ingredients"
										value={ingredient}
										onChange={(e) => handleIngredientsInputChange(e, i)}
										required
									/>
									<div className="my-auto mx-auto ingredient-button">
										{inputList.length > 1 && (
											<button
												type="button"
												onClick={() => handleRemoveClick(i)}
											>
												Remove
											</button>
										)}
										{inputList.length - 1 === i && (
											<button type="button" onClick={handleAddClick}>
												Add
											</button>
										)}
									</div>
								</row>
								// old system of imputing ingredients
								// <row className="row-box">
								// 	<input
								// 		className="mx-auto"
								//     type="text"
								// 		style={{ width: "80%" }}
								// 		name="ingredients"
								// 		placeholder="Enter an ingredient"
								// 		value={ingredient}
								// 		onChange={(e) => handleIngredientsInputChange(e, i)}
								// 	/>
								// 	<div className="btn-box">
								// 		{inputList.length > 1 && (
								// 			<button
								// 				type="button"
								// 				className="mr10"
								// 				onClick={() => handleRemoveClick(i)}
								// 			>
								// 				Remove
								// 			</button>
								// 		)}
								// 		{inputList.length - 1 === i && (
								// 			<button onClick={handleAddClick}>Add</button>
								// 		)}
								// 	</div>
								// </row>
							);
						})}
						{/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
						{/* </row> */}
					</row>
				</Form.Group>

				{/* <Form.Group>
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
        </Form.Group> */}

				{/* prep instructions */}
				<Form.Group className="mx-1 my-1">
					<Form.Label htmlFor="prepInstructions">Prep Instructions</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
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

				{/* prep time */}
				<Form.Group className="mx-1 my-2">
					<row className="row-box">
						<Form.Label htmlFor="prepTime" className="my-auto mx-auto">
							Prep Time
						</Form.Label>
						<Form.Control
							className="prep-cook-time"
							as="input"
							type="number"
							placeholder="Prep Time"
							name="prepTime"
							onChange={handleInputChange}
							value={recipeFormData.prepTime}
							required
						/>
						<Form.Control.Feedback type="invalid">
							How long does your dish take to prep?
						</Form.Control.Feedback>
					</row>
				</Form.Group>

				{/* cook time */}
				<Form.Group className="mx-1 my-2">
					<row className="row-box">
						<Form.Label htmlFor="cookTime" className="my-auto mx-auto">
							Cook Time
						</Form.Label>
						<Form.Control
							className="prep-cook-time"
							as="input"
							type="number"
							placeholder="Cook Time"
							name="cookTime"
							onChange={handleInputChange}
							value={recipeFormData.cookTime}
							required
						/>
						<Form.Control.Feedback type="invalid">
							How long does your dish take to cook?
						</Form.Control.Feedback>
					</row>
				</Form.Group>

				{/* difficulty */}
				<Form.Group className="mx-1 my-2">
					<row className="row-box">
						<Form.Label htmlFor="difficulty" className="my-auto mx-auto">
							Difficulty
						</Form.Label>
						<Form.Select
							className="prep-cook-time"
							type="text"
							name="difficulty"
							onChange={handleInputChange}
							value={recipeFormData.difficulty}
							required
						>
							<option value="Easy">Easy</option>
							<option value="Medium">Medium</option>
							<option value="Hard">Hard</option>
						</Form.Select>
					</row>
				</Form.Group>
				<Button
					type="submit"
					className="submit-recipe-button"
					onClick={() => handleFormSubmit()}
				>
					Add your recipe
				</Button>
			</Form>
		</>
	);
};

export default RecipeForm;
