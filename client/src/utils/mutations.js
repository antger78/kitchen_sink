import { gql } from '@apollo/client'

export const MUTATION_ADDUSER = gql`
mutation ($username: String!, $email:String!, $password:String!){
  addUser(username:$username, email: $email, password: $password) {
    token
    user {
      username
      email
    }
  }
}
`;
export const MUTATION_LOGIN = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token 
    user{
      _id
      username
      email
    }
  }
}
`;
// export const MUTATION_ADDRECIPE = gql`
// mutation ($title:String!,
// 	$prepInstructions:String,
// 	$prepTime:Int,
//   $cookTime:Int,
// 	$difficulty:String,
// 	$ingredients:[String]) {
//     addRecipe(title:$title,
//     	prepInstructions: $prepInstructions,
//     	prepTime:$prepTime,
//       cookTime:$cookTime,
//     	difficulty:$difficulty,
//       ingredients:$ingredients
//     ) {
//       title
//       prepInstructions
//       prepTime
//       difficulty
//       ingredients 
//     }
//   }
// `;
// export const MUTATION_DELETERECIPE = gql`

// `;
// export const MUTATION_UPDATERECIPE = gql`

// `;export const MUTATION_LIKERECIPE = gql`

// `;