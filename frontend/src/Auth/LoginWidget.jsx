import { Navigate } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../layouts/Utils/SpinnerLoading";
import SignIn from "./OktaSignInWidget";

const Login = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();
  const onSuccess = (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  }
  const onError = (err) => {
    console.log("error logging in", err);
  }

  if (!authState) {
    return (
      <SpinnerLoading />
    );
  }
  return authState.isAuthenticated ?
    <Navigate to={{ pathname: "/" }} /> :
    <SignIn config={config} onSuccess={onSuccess} onError={onError} />;
};

export default Login;