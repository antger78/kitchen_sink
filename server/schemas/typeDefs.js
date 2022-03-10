const { gql } = require("apollo-server-express");

const typeDefs = gql`
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
    ingredients: [{{ingredients:ingredient}, {ingredients:quantity}}]
    prepInstructions: String
    prepTime: Int
    difficulty: String
    userLikes: Int
	}

	// type Query {
	// 	thoughts: [Thought]!
	// 	thought(thoughtId: ID!): Thought
	// }

	// type Mutation {
	// 	addThought(thoughtText: String!, thoughtAuthor: String!): Thought
	// 	addComment(thoughtId: ID!, commentText: String!): Thought
	// 	removeThought(thoughtId: ID!): Thought
	// 	removeComment(thoughtId: ID!, commentId: ID!): Thought
	// }
`;

module.exports = typeDefs;
