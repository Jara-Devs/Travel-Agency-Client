import { Button, Col, Form, Input, Row, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { FilterValue } from "antd/es/table/interface";
import Title from "antd/es/typography/Title";
import {  useEffect, useState } from "react";
import { UndoOutlined } from "@ant-design/icons";

export interface TableEntitiesProps<T> {
  data?: T[];
  title: string;
  loading: boolean;
  load: (
    filters: Record<string, FilterValue | null>,
    search: string,
    setDataValue: (data: T[]) => void
  ) => void;
  columns: ColumnsType<T>;
  refresh?: boolean;
}

function TableEntities<T extends object>({
  data = [],
  load,
  columns,
  title,
  loading,
  refresh = false,
}: TableEntitiesProps<T>) {
  const [filters, setFilters] = useState<Record<string, FilterValue | null>>(
    {}
  );
  const [search, setSearch] = useState<string>("");

  const [dataValue, setDataValue] = useState<T[]>(data);
  const [form] = Form.useForm();

  useEffect(() => {
    load(filters, search, setDataValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filters]);

  useEffect(() => {
    if (refresh) load(filters, search, setDataValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

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
                  <Button
                    disabled={loading}
                    onClick={() => {
                      setFilters({});
                      setSearch("");
                      form.resetFields();
                    }}
                  >
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
}

export default TableEntities;
