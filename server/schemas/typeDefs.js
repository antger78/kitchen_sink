const { gql } = require("apollo-server-express");

const typeDefs = gql`
	scalar Date

	type User {
		_id: ID
		username: String
		password: String
		email: String
		recipes: [Recipe]
	}

	type Recipe {
		_id: ID
		title: String
		author: String
		createdAt: Date
		ingredients: [Ingredient]
		prepInstructions: String
		prepTime: Int
		difficulty: String
		userLikes: Int
	}
	type Ingredient {
		ingredient: String
		quantity: String
	}

	type Query {
		users: [User]
		recipes: [Recipe]
		recipe(recipeId: ID!): Recipe
	}

	# type Mutation {
	# 	# addUser(username: String!, email: String!, password: String!): User
	# 	# addRecipe(
	# 	# 	title: String!
	# 	# 	author: String!
	# 	# 	ingredients: [Ingredient]
	# 	# ): Recipe
	# }
`;

module.exports = typeDefs;
