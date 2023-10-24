import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "../pages/home/Admin";
import Ticket from "../pages/home/Ticket";
import User from "../pages/home/User";
import CinePlusWeb from "../pages/cine-plus/CinePlusWeb";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import MyFooter from "../layout/Footer";
import MyHeader from "../layout/Header";

export const WebRouter = () => {
  return (
    <Layout className="layout">
      <Header className="layout-header">
        <MyHeader user={null} home={true} />
      </Header>
      <Content>
        <Routes>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/ticket" element={<Ticket />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/web" element={<CinePlusWeb />}></Route>
          <Route path="*" element={<Navigate to="/web" />}></Route>
        </Routes>
      </Content>
      <Footer>
        <MyFooter />
      </Footer>
    </Layout>
  );
};
