import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import React from "react";
import { Image, List, Space, Button } from "antd";

const data = Array.from({ length: 23 }).map((_, i) => ({
  price: "500",
  href: "https://ant.design",
  title: `Offer ${i}`,
  description: "Here goes the offer drescription",
  content: "Here goes the offer content such as blablabla...",
}));

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Offers: React.FC = () => (
  <div className="offertable">
    <List
      itemLayout="vertical"
      size="small"
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          style={{ marginBottom: "20px" }}
          key={item.title}
          actions={[
            <IconText
              icon={StarOutlined}
              text="156"
              key="list-vertical-star-o"
            />,
            <IconText
              icon={LikeOutlined}
              text="156"
              key="list-vertical-like-o"
            />,
            <IconText
              icon={MessageOutlined}
              text="2"
              key="list-vertical-message"
            />,

            <div className="offer_price"> From ${item.price} </div>,
            <Button shape="round">Reserve</Button>,
          ]}
          extra={
            <Image
              width={100}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta
            title={<a href={item.href}>{item.title}</a>}
            description={item.description}
          />
          {item.content}
        </List.Item>
      )}
    />
  </div>
);

export default Offers;
