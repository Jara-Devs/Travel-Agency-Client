import { FunctionComponent, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Roles } from "../types/auth";
import { UserContext } from "../context/UserProvider";

type Props = {
  requiredRoles: Roles[];
  component: React.ComponentType<any>;
};

const PrivateRoutes: FunctionComponent<Props> = ({
  requiredRoles,
  component: Component,
}) => {
  const { user } = useContext(UserContext);

  const canAccess =
    requiredRoles.indexOf(Roles.User) !== -1 &&
    requiredRoles.indexOf(user!.role) !== -1;

  return canAccess ? (
    <Component />
  ) : (
    <Navigate to="/auth/login" replace></Navigate>
  );
};

export default PrivateRoutes;
