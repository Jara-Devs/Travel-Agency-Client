import { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  isAuthenticated: boolean;
  component: React.ComponentType<any>;
};

const PrivateRoutes: FunctionComponent<Props> = ({
  isAuthenticated,
  component: Component,
}) => {
  return isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to="/auth/login" replace></Navigate>
  );
};

export default PrivateRoutes;
