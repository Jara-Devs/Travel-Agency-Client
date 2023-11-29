import { Button, Col, Form, Input, Row, Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { CSSProperties, FC } from "react";
import { useSearchParams } from "react-router-dom";
import { UndoOutlined } from "@ant-design/icons";

export interface FilterItem {
  options: DefaultOptionType[];
  name: string;
  key?: string;
  styles?: CSSProperties;
  search?: boolean;
}

export interface FilterSearchProps {
  filters: FilterItem[];
  loading: boolean;
}

const FilterSearch: FC<FilterSearchProps> = ({ filters, loading }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [form] = Form.useForm();

  const reset = () => {
    setSearchParams();
    form.resetFields();
  };

  return (
    <Form form={form} style={{ height: "30px" }}>
      <Row justify="space-between">
        <Col>
          <Row gutter={5}>
            {filters.map((f, idx) => (
              <Col key={idx}>
                <Form.Item name={idx}>
                  <Select
                    onChange={(e) => {
                      const params = Object.fromEntries(searchParams);

                      const key = f.key ?? f.name.toLowerCase();
                      if (e) params[key] = e;
                      else delete params[key];

                      setSearchParams(params);
                    }}
                    style={f.styles}
                    showSearch={f.search}
                    filterOption={(input, option) => option?.label === input}
                    allowClear
                    options={f.options}
                    placeholder={f.name}
                  />
                </Form.Item>
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={8}>
          <Row gutter={5}>
            <Col span={20}>
              <Form.Item name="search">
                <Input.Search
                  allowClear
                  onSearch={(s) => {
                    const params = Object.fromEntries(searchParams);

                    const key = "search";
                    if (s) params[key] = s;
                    else delete params[key];

                    setSearchParams(params);
                  }}
                  placeholder="Search"
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Button disabled={loading} onClick={reset}>
                <UndoOutlined />
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterSearch;
