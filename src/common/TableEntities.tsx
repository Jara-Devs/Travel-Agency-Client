import { Button, Col, Form, Input, Row, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { FilterValue } from "antd/es/table/interface";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { UndoOutlined } from "@ant-design/icons";
import React, { forwardRef, useImperativeHandle } from "react";

export interface TableEntitiesRef {
  reset: () => void;
  reload: () => void;
}

export interface TableEntitiesProps<T> {
  title: string;
  loading: boolean;
  load: (
    filters: Record<string, FilterValue | null>,
    search: string,
    setDataValue: (data: T[]) => void
  ) => void;
  columns: ColumnsType<T>;
}

const TableEntities = <T extends object>(
  { load, columns, title, loading }: TableEntitiesProps<T>,
  ref?: React.Ref<TableEntitiesRef>
) => {
  const [filters, setFilters] = useState<Record<string, FilterValue | null>>(
    {}
  );
  const [search, setSearch] = useState<string>("");

  const [dataValue, setDataValue] = useState<T[]>([]);
  const [form] = Form.useForm();

  const reset = () => {
    setFilters({});
    setSearch("");
    form.resetFields();
  };

  useImperativeHandle(ref, () => ({
    reset: reset,
    reload: () => load(filters, search, setDataValue),
  }));

  useEffect(() => {
    load(filters, search, setDataValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filters]);

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
            </Row>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            loading={loading}
            pagination={false}
            rowKey="Id"
            dataSource={dataValue}
            columns={columns}
            onChange={(_, filters) => {
              setFilters(filters);
            }}
          ></Table>
        </Col>
      </Row>
    </>
  );
};

export default forwardRef(TableEntities);
