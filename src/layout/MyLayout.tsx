import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import AirplaneTicketOutlinedIcon from "@mui/icons-material/AirplaneTicketOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import PoolOutlinedIcon from "@mui/icons-material/PoolOutlined";
import BeachAccessOutlinedIcon from "@mui/icons-material/BeachAccessOutlined";
import MyHeader from "../layout/Header";

import React, { useContext, useState } from "react";
import { HomeOutlined, TeamOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Image, Layout, Menu } from "antd";
import { WebRouter } from "../routes/WebRoute";
import { UserContext } from "../context/UserProvider";
import { Roles } from "../types/auth";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  onClick?: () => void
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  } as MenuItem;
}

const MyLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const items: MenuItem[] = [
    getItem("Home", "1", <HomeOutlined />, undefined, () => navigate("/")),
    getItem("Services", "sub1", <BusinessCenterOutlinedIcon />, [
      getItem("Hotel", "2", <HotelOutlinedIcon />, undefined, () =>
        navigate("/service/hotel")
      ),
      getItem("Excursion", "3", <MapOutlinedIcon />, undefined, () =>
        navigate("/service/excursion")
      ),
      getItem("Flight", "4", <FlightOutlinedIcon />, undefined, () =>
        navigate("/service/flight")
      ),
    ]),
    getItem("Offers", "sub2", <LocalOfferOutlinedIcon />, [
      getItem("Hotel", "5", <HotelOutlinedIcon />, undefined, () =>
        navigate("/offer/hotel")
      ),
      getItem("Excursion", "6", <MapOutlinedIcon />, undefined, () =>
        navigate("/offer/excursion")
      ),
      getItem("Flight", "7", <FlightOutlinedIcon />, undefined, () =>
        navigate("/offer/flight")
      ),
    ]),
    getItem("Packages", "20", <AddShoppingCartOutlinedIcon />, undefined, () =>
      navigate("/package")
    ),
  ];

  const agencyMenu = (): MenuItem => {
    const agencyAdmin: MenuItem[] =
      user?.role === Roles.AdminAgency
        ? [
            getItem("Users", "8", <TeamOutlined />, undefined, () =>
              navigate("/agency/users")
            ),
          ]
        : [];

    const agencyManager: MenuItem[] =
      user?.role === Roles.AdminAgency || user?.role === Roles.ManagerAgency
        ? [
            getItem("Offers", "sub3", <LocalOfferOutlinedIcon />, [
              getItem("Hotel", "9", <HotelOutlinedIcon />, undefined, () =>
                navigate("/agency/offer/hotel")
              ),
              getItem("Excursion", "10", <MapOutlinedIcon />, undefined, () =>
                navigate("/agency/offer/excursion")
              ),
              getItem("Flight", "11", <FlightOutlinedIcon />, undefined, () =>
                navigate("/agency/offer/flight")
              ),
            ]),
            getItem(
              "Packages",
              "12",
              <AddShoppingCartOutlinedIcon />,
              undefined,
              () => navigate("/agency/package")
            ),
          ]
        : [];

    const agency: MenuItem = getItem(
      "Agency",
      "sub4",
      <AirplaneTicketOutlinedIcon />,
      [
        getItem(
          "Ticket",
          "13",
          <ConfirmationNumberOutlinedIcon />,
          undefined,
          () => navigate("/agency/ticket")
        ),
      ]
        .concat(agencyManager)
        .concat(agencyAdmin)
    );
    return agency;
  };

  const appMenu = (): MenuItem => {
    const appAdmin: MenuItem[] =
      user?.role === Roles.AdminApp
        ? [
            getItem("Users", "14", <TeamOutlined />, undefined, () =>
              navigate("/app/users")
            ),
          ]
        : [];

    const app: MenuItem = getItem(
      "App",
      "sub4",
      <AdminPanelSettingsOutlinedIcon />,
      [
        getItem("Services", "sub5", <BusinessCenterOutlinedIcon />, [
          getItem("Hotels", "15", <HotelOutlinedIcon />, undefined, () =>
            navigate("/app/hotel")
          ),
          getItem("Excursions", "16", <MapOutlinedIcon />, undefined, () =>
            navigate("/app/excursion")
          ),
          getItem("Flights", "17", <FlightOutlinedIcon />, undefined, () =>
            navigate("/app/flight")
          ),
          getItem("Places", "18", <BeachAccessOutlinedIcon />, undefined, () =>
            navigate("/app/place")
          ),
          getItem("Activities", "19", <PoolOutlinedIcon />, undefined, () =>
            navigate("/app/activity")
          ),
        ]),
      ].concat(appAdmin)
    );

    return app;
  };

  if (
    user?.role === Roles.AdminAgency ||
    user?.role === Roles.ManagerAgency ||
    user?.role === Roles.EmployeeAgency
  )
    items.push(agencyMenu());

  if (user?.role === Roles.AdminApp || user?.role === Roles.EmployeeApp)
    items.push(appMenu());

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        className="layout-screen-sidebar"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          className="center-content"
          style={collapsed ? { margin: "10px" } : { margin: "20px" }}
        >
          <Image
            className="layout-logo logo"
            width={collapsed ? "100%" : "60%"}
            height={collapsed ? "100%" : "60%"}
            src={logo}
            preview={false}
          />
        </div>
        {!collapsed && (
          <a href="https://github.com/Jara-Devs">
            <div
              className="center-content mt-10 mb-10"
              style={{ color: "white" }}
            >
              <h1>Jara-Travel</h1>
            </div>
          </a>
        )}
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>

      <Layout>
        <Header className="layout-header">
          <MyHeader />
        </Header>

        <Content>
          <WebRouter />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
