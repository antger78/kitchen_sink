const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID
    username: String
    password: String
    email: String
    recipes: [Recipe]
    likedRecipes: [Recipe]
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

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me(input: String): User
    users: [User]
    recipes: [Recipe]
    recipe(_id: ID!): Recipe
    keywordRecipe(input: String): [Recipe]
    # userRecipes(input:String): [Recipe]
    userFavoriteRecipes: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addRecipe(
      title: String!
      ingredients: [String]
      prepInstructions: String
      prepTime: Int
      cookTime: Int
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
    unlikeRecipe(_id: ID!): Recipe
  }
`;

module.exports = typeDefs;
