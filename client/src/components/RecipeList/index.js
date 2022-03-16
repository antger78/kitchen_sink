import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./recipeList.css";
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
		fontSize: "20px",
	},
};

const RecipeList = (props) => {
	const {
		id,
		title,
		author,
		difficulty,
		prepInstructions,
		prepTime,
		cookTime,
		ingredients,
		likesCount,
	} = props;
	// get data from db to populate cards
	// const { loading, data } = useQuery(QUERY_RECIPES);
	// // if data exists, store in queriedRecipes const
	// const queriedRecipes = data?.recipes || [];
	// console.log(queriedRecipes);
	return (
		<Card className="card col-sm-12 col-md-5 col-lg-4 m-2" key={id}>
			{/* <Card.Img variant="top" alt="recipe card img" /> */}
			<Card.Header className="container-fluid card-head ">
				<Card.Title>
					<span className="fa-solid fa-heart"></span>
					{title}
				</Card.Title>
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
	);
};

export default RecipeList;
