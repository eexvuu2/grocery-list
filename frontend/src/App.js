import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import TodoList from "./components/TodoList";
import NotFound from "./components/NotFound";
import { Switch } from "react-router-dom/cjs/react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/todo-list" component={TodoList} />
          <Route component={NotFound} />{" "}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
