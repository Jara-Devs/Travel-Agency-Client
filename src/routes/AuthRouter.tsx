import { Route, Routes, Navigate } from "react-router-dom";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Layout, { Content, Footer } from "antd/es/layout/layout";
import Link from "antd/es/typography/Link";

export const AuthRouter = () => {
  return (
    <Layout className="layout">
      <Content>
        <div className="auth-main">
          <Routes>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route
              path="*"
              element={<Navigate to="/auth/login" replace></Navigate>}
            ></Route>
          </Routes>
        </div>
      </Content>
      <Footer className="layout-footer">
        Cine Plus ©2023 Created by <Link href="https://github.com/raudel25">raudel25</Link>
      </Footer>
    </Layout>
  );
};
