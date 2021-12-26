import React from "react";

import { Route } from "wouter";
import Welcome from './pages/welcome'
import SignUp from './pages/SignUp'
import Configuration from './pages/Configuration'
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
      <Route path="/sign_up" component={SignUp} />
      <Route path="/configuration" component={Configuration} />
    </AuthContext.Provider>
  );
}

export default App;
