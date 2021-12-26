import React from "react";

import { Route } from "wouter";
import Welcome from './pages/welcome'
import AuthContext from './contextProviders/authContext'
import AuthReducer from './reducers/AuthReducer'

import './App.css';

function App() {
  const [state, dispatch] = AuthReducer()

  return (
     <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <Route path="/" component={Welcome} />
    </AuthContext.Provider>
  );
}

export default App;
