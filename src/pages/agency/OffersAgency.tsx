import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import { UserAgencyContext } from "../../types/auth";

const Offers = () => {
  const { user } = useContext(UserContext);

  return <>{(user as UserAgencyContext).agencyId}</>;
};

export default Offers;
