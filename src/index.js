import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql/",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
