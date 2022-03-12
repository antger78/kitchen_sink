import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import SearchRecipes from "./pages/homepage";
import Navbar from "./components/NavBar";
import RecipeCard from "./components/Recipe";

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
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          {/* <Switch>
            <Route exact path="/" component={} />

            <Route exact path="/add-recipe" component={addRecipe} />

            <Route exact path="/your-recipes" component={userRecipes} />

            <Route exact path="/liked-recipes" component={likedRecipes} />

            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch> */}
          {
            // <SearchRecipe component>
          }
          
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;