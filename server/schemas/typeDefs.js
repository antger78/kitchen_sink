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
    userLikes: [User]
  }
  type Ingredient {
    ingredient: String
    quantity: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    recipes: [Recipe]
    recipe(_id: ID!): Recipe
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    logIn(email: String!, password: String!): Auth
    addRecipe(
      title: String!
      author: String!
      ingredients: [Ingredient]
    ): Recipe
    deleteRecipe(_id: ID!): Recipe
    updateRecipe(
      title: String
      ingredients: [Ingredient]
      prepInstructions: String
      prepTime: Int
      difficulty: String
    ): Recipe
    likeRecipe(_id: ID!): Recipe
  }
`;

module.exports = typeDefs;
