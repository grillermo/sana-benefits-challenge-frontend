import './App.css';

import { Route } from "wouter";
import Welcome from './pages/welcome'

function App() {
  return (
    <>
      <Route path="/" component={Welcome} />
    </>
  );
}

export default App;
