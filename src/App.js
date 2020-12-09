import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import DragDrop from './components/dashboard/DragDrop';
import HomePage from './components/dashboard/HomePage';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route exact path="/workspace" component={HomePage} />
          <Route path="/workspace/:id" component={DragDrop} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
