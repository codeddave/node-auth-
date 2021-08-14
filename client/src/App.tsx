import {BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
import Register from './components/Register';

function App() {
  return (
    <div className="App ">
        <Router> 
          <Switch> 
            <Route exact path = "/register" component = {Register}/>
            <PrivateRoute exact path="/app" component={Home}/>
          </Switch>
        </Router>


    
    </div>
  );
}

export default App;
