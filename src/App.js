import React from "react";

import { Route } from "wouter";
import Welcome from './pages/welcome'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import SignOut from './pages/SignOut'
import Configuration from './pages/Configuration'

import MenuBar from './components/MenuBar'

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
      <MenuBar/>
      <Route path="/" component={Welcome} />
      <Route path="/sign_up" component={SignUp} />
      <Route path="/sign_in" component={SignIn} />
      <Route path="/sign_out" component={SignOut} />
      <Route path="/configuration" component={Configuration} />
    </AuthContext.Provider>
  );
}

export default App;
