import { Spin } from "antd";
import { FC } from "react";

const MySpin: FC<{ loading: boolean; initial?: boolean }> = ({
  loading,
  initial = false,
}) => {
  return (
    <>
      {loading && (
        <div
          className="center-spin"
          style={initial ? { backgroundColor: "white" } : {}}
        >
          <Spin size="large" />
        </div>
      )}
    </>
  );
};

export default MySpin;
