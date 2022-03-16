import React, { useState, useEffect } from "react";
import { Container, Form, Row, Spinner, InputGroup } from "react-bootstrap";

import RecipeList from "../RecipeList";
import { useQuery } from "@apollo/client";
import { QUERY_KEYWORDRECIPE } from "../../utils/queries";

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
	const { loading, data } = useQuery(QUERY_KEYWORDRECIPE, {
		variables: { input: searchInput },
	});

	useEffect(() => {
		if (data) {
			setSearchedRecipes(data.keywordRecipe);
		}
	}, [data]);

	return (
		<Container fluid className="mainBackground">
			{/* <h1>{category}</h1> */}
			<Row>
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
