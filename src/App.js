import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router";
import Signin from "./Components/Signin/Signin";
import StudentsSignup from "./Components/Signup/StudentsSignup";
import InstitutionSignup from "./Components/Signup/InstitutionSignup";
import Dashboard from "./Components/Dashboard";
import UserDashboard from "./Components/User/UserDashboard";
import "./styles.css";

// const Signin = lazy(() => import("./Components/Signin/Signin"));
// const StudentsSignup = lazy(() => import("./Components/Signup/StudentsSignup"));
// const InstitutionSignup = lazy(() =>
//   import("./Components/Signup/InstitutionSignup")
// );
// const Dashboard = lazy(() => import("./Components/Dashboard"));
// const UserDashboard = lazy(() => import("./Components/User/UserDashboard"));

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
          <Route path="/" component={RedirectHome} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
