import { UserProvider } from "./context/UserProvider";
import { AppRouter } from "./routes/AppRouter";

const CinePlus = () => {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  );
};

export default CinePlus;
