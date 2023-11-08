import { Spin } from "antd";
import { FC } from "react";

const MySpin: FC<{ loading: boolean }> = ({ loading }) => {
  return (
    <>
      {loading && (
        <div className="center-spin">
          <Spin size="large" />
        </div>
      )}
    </>
  );
};

export default MySpin;
