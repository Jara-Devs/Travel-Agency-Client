import { CSSProperties, ReactNode } from "react";
import { Avatar, Image, List } from "antd";
import logo from "../assets/logo.jpg";

export interface ShowEntitiesProps<T> {
  data: T[];
  loading: boolean;
  actions?: (value: T) => ReactNode[];
  content: (value: T) => ReactNode;
  convert: (value: T) => {
    avatar?: ReactNode;
    title?: string;
    description?: string;
  };
  imageStyles?: CSSProperties;
}

function ShowEntities<T>({
  data,
  actions,
  imageStyles,
  content,
  convert,
  loading,
}: ShowEntitiesProps<T>) {
  return (
    <div style={{ margin: "40px" }}>
      <List
        loading={loading}
        itemLayout="vertical"
        size="small"
        dataSource={data}
        renderItem={(item, idx) => {
          const entity = convert(item);
          return (
            <List.Item
              style={{ marginBottom: "20px" }}
              key={idx}
              actions={actions ? actions(item) : undefined}
              extra={
                <Image
                  style={imageStyles}
                  width={250}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                avatar={entity.avatar ? entity.avatar : <Avatar src={logo} />}
                title={entity.title}
                description={entity.description}
              />
              {content ? content(item) : undefined}
            </List.Item>
          );
        }}
      />
    </div>
  );
}

export default ShowEntities;
