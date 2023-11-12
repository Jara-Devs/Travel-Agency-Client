import { LikeOutlined, MessageOutlined, StarOutlined, DollarOutlined } from '@ant-design/icons';
import React from 'react';
import { Avatar, List, Space, Image } from 'antd';
import { Button } from 'antd/es/radio';
import { TypeIcon } from 'antd/es/message/PurePanel';

const data = Array.from({ length: 23 }).map((_, i) => ({
    price: '500',
    href: 'https://ant.design',
    title: `Offer ${i}`,
    description:
        'Here goes the offer drescription',
    content:
        'Here goes the offer content such as blablabla...',
}));

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const Offers: React.FC = () => (
    <List
        itemLayout="vertical"
        size="large"
        bordered


        pagination={{
            onChange: (page) => {
                console.log(page);
            },
            pageSize: 3,
            align: 'center'

        }}
        dataSource={data}

        renderItem={(item) => (
            <List.Item


                key={item.title}
                actions={[
                    <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                    <Button type="primary" >Reserve</Button>,
                    <div className='offer_price'> From ${item.price} </div>,

                ]}

                extra={
                    <img
                        width={272}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                }
            >
                <List.Item.Meta
                    //   avatar={<Avatar src={item.avatar} />}
                    
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}

                />
                {item.content}
            </List.Item>
        )}
    />
);

export default Offers;