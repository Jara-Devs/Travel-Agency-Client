import { Col, Input, Row, Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { CSSProperties, FC } from "react";
import { useSearchParams } from "react-router-dom";

export interface FilterItem {
  options: DefaultOptionType[];
  name: string;
  styles?: CSSProperties;
  search?: boolean;
}

export interface FilterSearchProps {
  filters: FilterItem[];
}

const FilterSearch: FC<FilterSearchProps> = ({ filters }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <Row justify="space-between">
      <Col>
        <Row>
          {filters.map((f, idx) => (
            <Col key={idx}>
              <Select
                onChange={(e) => {
                  const params = Object.fromEntries(searchParams);

                  if (e) params[f.name] = e;
                  else delete params[f.name];

                  setSearchParams(params);
                }}
                style={f.styles}
                showSearch={f.search}
                filterOption={(input, option) => option?.label === input}
                allowClear
                options={f.options}
                placeholder={f.name}
              />
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={8}>
        <Input.Search
          allowClear
          onSearch={(s) => {
            const params = Object.fromEntries(searchParams);

            const key = "Search";
            if (s) params[key] = s;
            else delete params[key];

            setSearchParams(params);
          }}
          placeholder="Search"
        />
      </Col>
    </Row>
  );
};

export default FilterSearch;
