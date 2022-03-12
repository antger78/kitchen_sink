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
    ingredients: [String]
    prepInstructions: String
    prepTime: Int
    cookTime: Int
    difficulty: String
    userLikes: [User]
    likesCount: Int
  }

  input RecipeSearchTerm {
    title: String
  }

  input RecipeFilter {
    filter: RecipeSearchTerm
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    recipes: [Recipe]
    recipe(_id: ID!): Recipe
    keywordRecipe(input: RecipeFilter): [Recipe]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addRecipe(
      title: String!
      ingredients: [String]
      prepInstructions: String
			prepTime: Int
      cookTime:Int
			difficulty: String
    ): Recipe
    deleteRecipe(_id: ID!): Recipe
    updateRecipe(
      _id: ID!
      title: String
      ingredients: [String]
      prepInstructions: String
      prepTime: Int
      cookTime: Int
      difficulty: String
    ): Recipe
    likeRecipe(_id: ID!): Recipe
  }
`;

module.exports = typeDefs;
