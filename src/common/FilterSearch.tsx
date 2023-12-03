import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Slider,
} from "antd";
import { DefaultOptionType } from "antd/es/select";
import { CSSProperties, FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { UndoOutlined, FilterFilled } from "@ant-design/icons";
import dayjs from "dayjs";

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
  packageOrOffer?: boolean;
}

const FilterSearch: FC<FilterSearchProps> = ({
  filters,
  loading,
  packageOrOffer = false,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [form] = Form.useForm();

  const reset = () => {
    setSearchParams();
    form.resetFields();
    setFilterActive(false);
    setPriceRange([0, 100]);
  };

  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);

  // Handle the change in the slider
  const handleSliderChange = (value: number[]) => {
    setPriceRange(value);
  };

  // Handle the change in the input numbers
  const handleInputNumberChange = (index: number, value: number) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = value;
    setPriceRange(newPriceRange);
  };

  const [filterActive, setFilterActive] = useState<boolean>(false);

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    if (filterActive) {
      params["minPrice"] = priceRange[0].toString();
      params["maxPrice"] = priceRange[1].toString();
    } else {
      delete params["minPrice"];
      delete params["maxPrice"];
    }

    setSearchParams(params);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterActive]);

  useEffect(() => {
    if (filterActive) setFilterActive(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceRange]);

  return (
    <Form form={form} style={{ height: packageOrOffer ? "80px" : "30px" }}>
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
      {packageOrOffer && (
        <Row justify="space-between">
          <Col>
            <Form.Item name="date">
              <DatePicker.RangePicker
                format="DD/MM/YYYY HH:mm"
                showTime
                onChange={(v) => {
                  const params = Object.fromEntries(searchParams);

                  if (v) {
                    params["start"] = dayjs(v[0]).valueOf().toString();
                    params["end"] = dayjs(v[1]).valueOf().toString();
                  } else {
                    delete params["start"];
                    delete params["end"];
                  }

                  setSearchParams(params);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={12}>
                <Slider
                  range
                  min={0}
                  max={1000}
                  value={priceRange}
                  onChange={handleSliderChange}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  value={priceRange[0]}
                  onChange={(value) => handleInputNumberChange(0, value!)}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  value={priceRange[1]}
                  onChange={(value) => handleInputNumberChange(1, value!)}
                />
              </Col>
              <Col span={2}>
                <Button onClick={() => setFilterActive((a) => !a)}>
                  <FilterFilled
                    style={filterActive ? { color: "green" } : {}}
                  />
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </Form>
  );
};

export default FilterSearch;
