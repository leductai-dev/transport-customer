import React, { lazy, Suspense,  } from "react";
import { Route, Switch, Redirect } from "react-router";
import Signin from "./Components/Signin/Signin";
import StudentsSignup from "./Components/Signup/StudentsSignup";
import InstitutionSignup from "./Components/Signup/InstitutionSignup";
import Dashboard from "./Components/Dashboard";
import Order from "./Components/Order";
import UserDashboard from "./Components/User/UserDashboard";
import "./styles.css";

const RedirectHome = () => {
  return <Redirect to="/dashboard/home" />;
};

const App = (props) => {

  return (
    <div className="App">
      <Suspense fallback={<div>Lazy Loading...</div>}>
        <Switch>
          <Route path="/userdashboard" component={UserDashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/StudentsSignup" component={StudentsSignup} />
          <Route path="/InstitutionSignup" component={InstitutionSignup} />
          <Route path="/login" component={Signin} />
          <Route path="/order" component={Order} />
          <Route path="/" component={RedirectHome} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
