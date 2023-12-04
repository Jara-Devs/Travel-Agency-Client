import { Typography } from "antd";
import Title from "antd/es/typography/Title";
import { ReactNode, FC } from "react";
import logo from "../assets/logo.jpg";

export interface PrintDocumentProps {
  node: ReactNode;
  title: string;
}

const PrintDocument: FC<PrintDocumentProps> = ({ title, node }) => (
  <div className="table-print">
    <div className="print-title">
      <div>
        <Typography>
          <Title level={3}>{title}</Title>
        </Typography>
      </div>
      <div>
        <img src={logo} alt="logo" className="print-logo" />
      </div>
    </div>
    {node}
  </div>
);

export default PrintDocument;
