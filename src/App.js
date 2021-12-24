import './App.css';

import { Route } from "wouter";
import Welcome from './pages/welcome'

function App() {
  return (
    <div className="container">
      <Route path="/" component={Welcome} />
    </div>
  );
}

export default App;
