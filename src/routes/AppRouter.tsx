import { AuthRouter } from "./AuthRouter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WebRouter } from "./WebRoute";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import { authService } from "../api/auth";
import { ApiResponse } from "../types/api";
import { User } from "../types/auth";

export const AppRouter = () => {
  const { login } = useContext(UserContext);
  const checkRegister = () => {
    const token = localStorage.getItem("accessToken");

    const { renew } = authService();

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
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<AuthRouter />}></Route>
        <Route path="*" element={<WebRouter />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
