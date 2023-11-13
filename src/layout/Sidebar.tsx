import { Image, Layout} from "antd";
import logo from "../assets/logo.jpg";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { Roles } from "../types/auth";
import { Content, Footer } from "antd/es/layout/layout";
import MyMenu, { ItemType, MenuType } from "./Menu";

export const Sidebar = () => {
  const { user } = useContext(UserContext);

  const items: (MenuType | ItemType)[] = [
    { label: "Home", link: "/home" },
    {
      label: "Services",
      items: [
        { label: "Hotels", link: "/service/hotel" },
        { label: "Excursions", link: "/service/excursion" },
        { label: "Flights", link: "/service/flight" },
      ],
    },
    {
      label: "Offers",
      items: [
        { label: "Hotels", link: "/offer/hotel" },
        { label: "Excursions", link: "/offer/excursion" },
        { label: "Flights", link: "/offer/flight" },
      ],
    },
  ];

  const agencyMenu = (): MenuType => {
    const agencyAdmin: ItemType[] =
      user?.role === Roles.AdminAgency
        ? [{ label: "Users", link: "/agency/users" }]
        : [];

    const agencyManager: ItemType[] =
      user?.role === Roles.AdminAgency || user?.role === Roles.ManagerAgency
        ? [
            { label: "Manage Offers", link: "/agency/offer" },
            { label: "Manage Packages", link: "/agency/package" },
          ]
        : [];

    const agency: MenuType = {
      label: "Agency",
      items: [{ label: "Ticket", link: "/agency/ticket" }]
        .concat(agencyManager)
        .concat(agencyAdmin),
    };

    return agency;
  };

  if (
    user?.role === Roles.AdminAgency ||
    user?.role === Roles.ManagerAgency ||
    user?.role === Roles.EmployeeAgency
  )
    items.push(agencyMenu());

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

        <div className="center-content">
          <MyMenu items={items} />
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
