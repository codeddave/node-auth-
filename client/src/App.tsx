import {BrowserRouter as Router, Switch, Route } from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute";
import Register from './components/Register';

function App() {
  return (
    <div className="App ">
        <Router> 
          <Switch> 
           
            <PrivateRoute exact path="/register" component={Register}/>
          </Switch>
        </Router>


    
    </div>
  );
}

export default App;
