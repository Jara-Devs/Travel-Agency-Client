import { ReactNode } from "react";
import { Avatar, Card, Image, List } from "antd";
import logo from "../assets/logo.jpg";
import { Image as ApiImage } from "../types/api";

export interface ShowEntitiesProps<T> {
  data: T[];
  loading: boolean;
  actions?: (value: T) => ReactNode[];
  content: (value: T) => ReactNode;
  convert: (value: T) => {
    avatar?: ReactNode;
    title?: string;
    description?: string;
    image: ApiImage;
  };
}

function ShowEntities<T>({
  data,
  actions,
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
            <Card hoverable key={idx} style={{ marginBottom: "50px" }}>
              <List.Item
                actions={actions ? actions(item) : undefined}
                extra={
                  <Image
                    preview={false}
                    className="show-mini-image"
                    alt={entity.image.name}
                    src={entity.image.url}
                  />
                }
              >
                <List.Item.Meta
                  avatar={
                    entity.avatar ? (
                      entity.avatar
                    ) : (
                      <Avatar size={40} src={logo} />
                    )
                  }
                  title={entity.title}
                  description={entity.description}
                />
                {content ? content(item) : undefined}
              </List.Item>
            </Card>
          );
        }}
      />
    </div>
  );
}

export default ShowEntities;
