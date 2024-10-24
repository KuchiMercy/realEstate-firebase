import { Navigate, Outlet } from "react-router-dom";
import UseAuthStatus from "../hooks/UseAuthStatus";

const PrivateRoutes = () => {
  const [loggedIn, checkStatus] = UseAuthStatus();
  if (checkStatus) {
    return <h3>Loading...</h3>;
  }
  return <div>{loggedIn ? <Outlet /> : <Navigate to={"/sign-in"} />}</div>;
};

export default PrivateRoutes;
