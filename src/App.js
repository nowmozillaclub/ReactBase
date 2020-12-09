import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import DragDrop from './components/dashboard/DragDrop';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/workspace" component={DragDrop} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
