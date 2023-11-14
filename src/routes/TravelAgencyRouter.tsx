import { AuthRouter } from "./AuthRouter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WebRouter } from "./WebRoute";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import { authService } from "../api/auth";
import { ApiResponse } from "../types/api";
import { User } from "../types/auth";
import { useState } from "react";
import MySpin from "../layout/MySpin";

const TravelAgencyRouter = () => {
  const { login, user } = useContext(UserContext);
  const { renew } = authService();

  const [loading, setLoading] = useState(false);

  const checkRegister = () => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoading(true);
      renew()
        .then((response: ApiResponse<User>) => {
          if (response.ok) {
            login(response.value!);
          } else setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (user) setLoading(false);
  }, [user]);

  useEffect(() => {
    checkRegister();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <MySpin loading={loading} />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/auth/*" element={<AuthRouter />}></Route>
            <Route path="*" element={<WebRouter />}></Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default TravelAgencyRouter;
