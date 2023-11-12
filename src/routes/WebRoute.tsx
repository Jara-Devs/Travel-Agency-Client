import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "../pages/home/Admin";
import Ticket from "../pages/home/Ticket";
import User from "../pages/home/User";
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import MyHeader from "../layout/Header";
import { Sidebar } from "../layout/Sidebar";
import MainScreen from "../pages/MainScreen";
import Sider from "antd/es/layout/Sider";
import HotelsOffers from '../pages/home/TouristView';

export const WebRouter = () => {
  return (
    <Layout className="layout">
      <Sider width={275}>
        <Sidebar />
      </Sider>

      <Layout>
        <Header className="layout-header">
          <MyHeader />
        </Header>

        <Content>
          <div className="mt-10">
            <HotelsOffers />

          </div>

          <Routes>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/ticket" element={<Ticket />}></Route>
            <Route path="/user" element={<User />}></Route>
            <Route path="/" element={<MainScreen />}></Route>
            <Route path="*" element={<Navigate to="/" />}></Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
