import {BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
import Register from './components/Register';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App ">
        <Router> 
          <ToastContainer position="top-center" hideProgressBar/>
          <Switch> 
            <Route exact path = "/register" component = {Register}/>
            <PrivateRoute exact path="/app" component={Home}/>
          </Switch>
        </Router>


    
    </div>
  );
}

export default App;
