import { UserProvider } from "./context/UserProvider";
import { AppRouter } from "./routes/AppRouter";


const TravelAgency = () => {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  );
};

export default TravelAgency;
