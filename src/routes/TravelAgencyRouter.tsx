import { AuthRouter } from "./AuthRouter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WebRouter } from "./WebRoute";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import { authService } from "../api/auth";
import { ApiResponse } from "../types/api";
import { User } from "../types/auth";

const TravelAgencyRouter = () => {
  const { login } = useContext(UserContext);
  const { renew } = authService();

  const checkRegister = () => {
    const token = localStorage.getItem("token");

    if (token) {
      renew().then((response: ApiResponse<User>) => {
        if (response.ok) {
          login(response.value!);
        }
      });
    }
  };

  useEffect(() => {
    checkRegister();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<AuthRouter />}></Route>
        <Route path="*" element={<WebRouter />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default TravelAgencyRouter;
