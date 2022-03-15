import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query {
    users {
      _id
      username
    }
  }
`;

export const QUERY_RECIPES = gql`
  query {
    recipes {
      _id
      title
      author
      createdAt
      difficulty
      prepTime
      cookTime
      ingredients
      prepInstructions
      # userLikes
      likesCount
    }
  }
`;

export const QUERY_RECIPE = gql`
  query ($_id: ID) {
    recipe(_id: $_id) {
      _id
      title
      author
      createdAt
      difficulty
      prepTime
      cookTime
      ingredients
      prepInstructions
      userLikes
      likesCount
    }
  }
`;

export const QUERY_KEYWORDRECIPE = gql`
  query ($input: String) {
    keywordRecipe(input: $input) {
      _id
      title
      difficulty
      prepTime
      cookTime
      ingredients
      prepInstructions
    }
  }
`;

export const QUERY_ME = gql`
query {
  me{
    recipes{
      _id
      title
      author
      ingredients
      prepTime
      cookTime
      prepInstructions
      difficulty
      likesCount
    }
  }
}
`;