import React, { lazy, Suspense, useEffect  } from "react";
import { Route, Switch, Redirect } from "react-router";
import Signin from "./Components/Signin/Signin";
import Register from "./Components/Signup/StudentsSignup";

import StudentsSignup from "./Components/Signup/StudentsSignup";
import InstitutionSignup from "./Components/Signup/InstitutionSignup";
import Dashboard from "./Components/Dashboard";
import Order from "./Components/Order";
import UserDashboard from "./Components/User/UserDashboard";
import "./styles.css";
import {useSelector,useDispatch} from 'react-redux'
import {loginUser} from './Actions/Actions'
import { useHistory } from "react-router";
const RedirectHome = () => {
  return <Redirect to="/dashboard/home" />;
};

const App = (props) => {
  const customer = useSelector((state) => state.user);
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(()=>{
      if(localStorage.getItem("user")){
        dispatch(loginUser(JSON.parse(localStorage.getItem("user"))))
        history.push('/dashboard/home')
      }
  },[])

  return (
    <div className="App">
      <Suspense fallback={<div>Lazy Loading...</div>}>
        <Switch>
          <Route path="/userdashboard" component={UserDashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/CustomerSignup" component={StudentsSignup} />
          <Route path="/InstitutionSignup" component={InstitutionSignup} />
          <Route path="/login" component={Signin} />
          <Route path="/register" component={Register} />
          <Route path="/order" component={Order} />
          <Route path="/" component={RedirectHome} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
