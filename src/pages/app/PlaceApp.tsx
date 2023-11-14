import { Button, Col, Row, Tooltip, Typography, message } from "antd";
import { touristPlace } from "../../api/services";
import { useState } from "react";
import Title from "antd/es/typography/Title";
import { TouristPlace } from "../../types/sevice";
import MySpin from "../../layout/MySpin";
import TableEntities from "../../common/TableEntities";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { FilterValue } from "antd/es/table/interface";
import { Filter } from "odata-query";

const PlaceApp = () => {
  const { get } = touristPlace();
  const [loading, setLoading] = useState<boolean>(false);

  const load = async (
    _: Record<string, FilterValue | null>,
    search: string,
    setDataValue: (data: TouristPlace[]) => void
  ) => {
    setLoading(true);

    const searchFilter: Filter = { Name: { contains: search } };

    const response = await get({
      select: ["Id", "Description", "Name", "Address"],
      filter: searchFilter,
    });

    if (response.ok) {
      const data = response.value || [];
      setDataValue(data);
    } else {
      message.error(response.message);
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <MySpin loading={loading} />}
      <div className="m-5">
        <Row justify="space-between" className="app-header">
          <Col>
            <Typography>
              <Title>Places</Title>
            </Typography>
          </Col>
          <Col>
            <Button type="primary" disabled={loading}>
              Create
            </Button>
          </Col>
        </Row>
        <Row className="content-center m-10">
          <Col span={24}>
            <TableEntities
              title="Places"
              loading={loading}
              columns={[
                {
                  title: "Name",
                  key: "name",
                  render: (v: TouristPlace) => <>{v.Name}</>,
                },
                {
                  title: "Description",
                  key: "description",
                  render: (v: TouristPlace) => <>{v.Description}</>,
                },
                {
                  title: "Address",
                  key: "address",
                  render: (v: TouristPlace) => (
                    <>{`${v.Address.Description}, ${v.Address.City}, ${v.Address.Country}`}</>
                  ),
                },
                {
                  title: "Actions",
                  key: "Actions",
                  render: () => (
                    <Row gutter={10}>
                      <Col>
                        <Tooltip title="Show">
                          <EyeOutlined />
                        </Tooltip>
                      </Col>
                      <Col>
                        <Tooltip title="Edit">
                          <EditOutlined />
                        </Tooltip>
                      </Col>
                      <Col>
                        <Tooltip title="Delete">
                          <DeleteOutlined />
                        </Tooltip>
                      </Col>
                    </Row>
                  ),
                },
              ]}
              load={load}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PlaceApp;
