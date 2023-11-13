import { UserProvider } from "./context/UserProvider";
import TravelAgencyRouter from "./routes/TravelAgencyRouter";

const TravelAgency = () => {
  return (
    <UserProvider>
      <TravelAgencyRouter />
    </UserProvider>
  );
};

export default TravelAgency;
