import { Button, Col, Form, Input, Row, Select, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import { useEffect, useState, useRef } from "react";
import { UndoOutlined } from "@ant-design/icons";
import React, { forwardRef, useImperativeHandle } from "react";
import { FilterItem } from "./FilterSearch";
import ReactToPrint from "react-to-print";
import logo from "../assets/logo.jpg";

export interface TableEntitiesRef {
  reset: () => void;
  reload: () => void;
}

export interface TableEntitiesProps<T> {
  title: string;
  loading: boolean;
  load: (
    filters: Record<string, any>,
    search: string,
    setDataValue: (data: T[]) => void
  ) => void;
  columns: ColumnsType<T>;
  filters?: FilterItem[];
  footer?: () => React.ReactNode;
}

const TableEntities = <T extends object>(
  {
    load,
    columns,
    title,
    loading,
    footer,
    filters = [],
  }: TableEntitiesProps<T>,
  ref?: React.Ref<TableEntitiesRef>
) => {
  const [search, setSearch] = useState<string>("");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  const [dataValue, setDataValue] = useState<T[]>([]);
  const [form] = Form.useForm();

  const componentRef = useRef<any>(null);

  const reset = () => {
    setSearch("");
    setFilterValues({});
    form.resetFields();
  };

  useImperativeHandle(ref, () => ({
    reset: reset,
    reload: () => load(filterValues, search, setDataValue),
  }));

  useEffect(() => {
    load(filterValues, search, setDataValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterValues]);

  return (
    <>
      <Row justify="space-between">
        <Col>
          <Typography>
            <Title level={3}>{title}</Title>
          </Typography>
        </Col>
        <Col>
          <Form form={form}>
            <Row gutter={5}>
              {filters.map((f, idx) => (
                <Col key={idx}>
                  <Form.Item name={idx}>
                    <Select
                      onChange={(e) => {
                        const params = { ...filterValues };
                        const key = f.key ?? f.name.toLowerCase();

                        if (e) params[key] = e;
                        else delete params[key];

                        setFilterValues(params);
                      }}
                      style={f.styles}
                      showSearch={f.search}
                      filterOption={(input, option) =>
                        (option?.label
                          ?.toString()
                          ?.toLowerCase()
                          ?.indexOf(input.toLowerCase()) ?? -1) >= 0
                      }
                      allowClear
                      options={f.options}
                      placeholder={f.name}
                    />
                  </Form.Item>
                </Col>
              ))}
              <Col>
                <Form.Item name="search">
                  <Input.Search
                    placeholder="Search"
                    onSearch={(v) => setSearch(v)}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button disabled={loading} onClick={reset}>
                    <UndoOutlined />
                  </Button>
                </Form.Item>
              </Col>
              <Col>
                <ReactToPrint
                  trigger={() => <Button type="primary">Print</Button>}
                  content={() => componentRef.current}
                />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div ref={componentRef} className="table-print">
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
            <Table
              loading={loading}
              pagination={false}
              rowKey="id"
              dataSource={dataValue}
              columns={columns}
            ></Table>

            {footer && <div className="mt-5">{footer()}</div>}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default forwardRef(TableEntities);
