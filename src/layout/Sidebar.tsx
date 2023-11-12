import { Image, Layout } from "antd";
import logo from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { Roles } from "../types/auth";
import { Content, Footer } from "antd/es/layout/layout";
import { Button } from 'antd/es/radio';
interface Dpto {
  text: string;
  link: string;
}

export const Sidebar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const getDpto = (body: Dpto) => (
    <div className="layout-sidebar-button" onClick={() => navigate(body.link)}>
      <p>{body.text}</p>
    </div>
  );

  const dptos: Dpto[] = [
    { text: "Home", link: "" ,},
    { text: "Hotels", link: "" },
    { text: "Excursions", link: "" },
    { text: "Packages", link: "" },
  ];

  const agency: Dpto = { text: "Agency", link: "" };
  const app: Dpto = { text: "App", link: "" };

  return (
    <Layout className="layout-screen-sidebar">
      <Content>
        <div className="center-content mt-5">
          <Image
            className="layout-logo logo"
            width={"100px"}
            height={"100px"}
            src={logo}
            preview={false}
          />
        </div>
        <div className="center-content mt-10 mb-10">
          <h1>Jara-Travel</h1>
        </div>

        {dptos.map((p) => getDpto(p))}

        <div className="mt-10">
          {(user?.role === Roles.AdminApp ||
            user?.role === Roles.EmployeeApp) &&
            getDpto(app)}
          {(user?.role === Roles.AdminAgency ||
            user?.role === Roles.EmployeeAgency ||
            user?.role === Roles.ManagerAgency) &&
            getDpto(agency)}
        </div>
      </Content>

      <Footer className="layout-footer">
        <a href="https://github.com/Jara-Devs">
          <div className="layout-footer-content">
            <p>Travel Agency ©2023</p>
            <p className="mt-1">Created by JaraTravel</p>
          </div>
        </a>
      </Footer>
    </Layout>
  );
};
