import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import MyHeader from "../layout/Header";
import { Sidebar } from "../layout/Sidebar";
import Sider from "antd/es/layout/Sider";
import OfferRoute from "./OfferRoute";
import ServiceRoute from "./ServiceRoute";
import Packages from "../pages/home/packages/Packages";
import AppRoute from "./AppRouter";
import AgencyRoute from "./AgencyRouter";
import HomeView from "../pages/HomeView";

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

        <Content className="layout-content">
          <Routes>
            <Route path="/offer/*" element={<OfferRoute />}></Route>
            <Route path="/service/*" element={<ServiceRoute />}></Route>
            <Route path="/package" element={<Packages />}></Route>
            <Route path="/app/*" element={<AppRoute />}></Route>
            <Route path="/agency/*" element={<AgencyRoute />}></Route>
            <Route path="/" element={<HomeView />}></Route>
            <Route path="*" element={<Navigate to="/" />}></Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
