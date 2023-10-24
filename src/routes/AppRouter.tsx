import { AuthRouter } from "./AuthRouter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WebRouter } from "./WebRoute";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<AuthRouter />}></Route>
        <Route path="*" element={<WebRouter />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
