import { CSSProperties, ReactNode } from "react";
import { Image, List } from "antd";
import { ShowEntity } from "../types/entity";

export interface ShowEntitiesProps<T> {
  data: T[];
  actions: ReactNode[];
  content: ReactNode;
  title: string;
  imageStyles?: CSSProperties;
}

function ShowEntities<T extends ShowEntity>({
  data,
  actions,
  imageStyles,
  content,
}: ShowEntitiesProps<T>) {
  return (
    <div style={{ margin: "40px" }}>
      <List
        itemLayout="vertical"
        size="small"
        dataSource={data}
        renderItem={(item, idx) => (
          <List.Item
            style={{ marginBottom: "20px" }}
            key={idx}
            actions={actions}
            extra={
              <Image
                style={imageStyles}
                width={100}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta title={item.title} description={item.description} />
            {content}
          </List.Item>
        )}
      />
    </div>
  );
}

export default ShowEntities;
