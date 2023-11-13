import { Divider } from "antd";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";

export interface MenuType {
  label: string;
  items: (MenuType | ItemType)[];
}

export interface ItemType {
  label: string;
  link: string;
}

const isMenu = (item: any) => item.items != null;

const MyMenu: FC<{ items: (MenuType | ItemType)[]; divider?: boolean }> = ({
  items,
  divider = true,
}) => {
  const [selected, setSelected] = useState(items.map((_) => false));
  const navigate = useNavigate();

  return (
    <div style={{ width: "150px" }}>
      {items.map((it, idx) => (
        <div key={idx}>
          {isMenu(it) ? (
            <>
              <div
                className="layout-sidebar-button"
                onClick={() =>
                  setSelected(
                    items.map((_, idx1) =>
                      idx === idx1 ? !selected[idx] : false
                    )
                  )
                }
              >
                <p>{it.label}</p>
                {selected[idx] && <CaretDownOutlined />}
              </div>
              {selected[idx] && (
                <MyMenu divider={false} items={(it as MenuType).items} />
              )}
            </>
          ) : (
            <div
              className="layout-sidebar-button"
              onClick={() => navigate((it as ItemType).link)}
            >
              <p>{it.label}</p>
            </div>
          )}
          {idx !== items.length - 1 && divider && (
            <Divider className="layout-sidebar-divider" />
          )}
        </div>
      ))}
    </div>
  );
};

export default MyMenu;
