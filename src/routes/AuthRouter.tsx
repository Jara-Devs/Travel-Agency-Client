import { Route, Routes, Navigate } from "react-router-dom";
import TuristRegister from "../pages/auth/TuristRegister";
import AgencyRegister from "../pages/auth/AgencyRegister";
import Login from "../pages/auth/Login";
import Layout, { Content, Footer } from "antd/es/layout/layout";
import Link from "antd/es/typography/Link";

export const AuthRouter = () => {
  return (
    <Layout className="layout">
      <Content>
        <div className="auth-main">
          <Routes>
            <Route path="/register/turist" element={<TuristRegister />}></Route>
            <Route path="/register/agency" element={<AgencyRegister />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route
              path="*"
              element={<Navigate to="/auth/login" replace></Navigate>}
            ></Route>
          </Routes>
        </div>
      </Content>
      <Footer className="layout-footer">
        Travel Agency ©2023 Created by <Link href="https://github.com/Jara-Devs">JARA-Devs</Link>
      </Footer>
    </Layout>
  );
};
