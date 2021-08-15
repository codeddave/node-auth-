import {BrowserRouter as Router, Switch } from "react-router-dom"
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
import Register from './components/Register';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PublicRoute from "./components/PublicRoute";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <div className="App ">
        <Router> 
          <ToastContainer position="top-center" hideProgressBar/>
          <Switch> 
            <PublicRoute exact path = "/register" component = {Register}/>
            <PublicRoute exact path = "/login" component = {Login} />
            <PublicRoute exact path = "/forgot-password" component = {ForgotPassword} />

            <PrivateRoute exact path="/app" component={Home}/>
          </Switch>
        </Router>


    
    </div>
  );
}

export default App;
