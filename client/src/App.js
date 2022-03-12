import React, { useState } from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import RecipeContainer from "./components/RecipeContainer";
import RecipeForm from "./components/addRecipe";


const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  const categories = ['kitchen sink', 'your recipes','your favorite recipes', 'add'];
  const [currentCategory, setCurrentCategory] = useState(categories[0]);

  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar 
            categories={categories}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
          />
          <Switch>
            <Route exact path="/">
              <RecipeContainer category={categories[0]} />
            </Route>
            {/* add recipe component/modal shows */}
            <Route exact path="/add-recipe">
              <RecipeForm category={categories[3]} />
            </Route>

            {/* show recipe container with "Your Recipes" h1 */}
            <Route exact path="/your-recipes">
              <RecipeContainer category={categories[1]}  />
            </Route> 

            {/* show recipe container with "Your Fave Recipes" h1 */}
            <Route exact path="/liked-recipes">
              <RecipeContainer category={categories[2]}  />
            </Route> 

            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
          {/* <RecipeContainer category={currentCategory} /> */}
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;

/*
liked recipes
userrecipes
addrecipe

SearchRecipes likedRecipes={state} userRecipes={state}
*/