import { Button, Col, Row, Tooltip, Typography, message } from "antd";
import { city } from "../../../api/services";
import { useRef, useState } from "react";
import Title from "antd/es/typography/Title";
import { City, CityFormType } from "../../../types/services";
import TableEntities, { TableEntitiesRef } from "../../../common/TableEntities";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { FilterValue } from "antd/es/table/interface";
import { Filter } from "odata-query";
import ShowCity from "../../show/services/ShowCity";
import CityForm from "./CityForm";

const CityApp = () => {
  const { get, create, edit, remove } = city();
  const [loading, setLoading] = useState<boolean>(false);

  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);

  const [selected, setSelected] = useState<City>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const tableRef = useRef<TableEntitiesRef>({
    reload: () => {},
    reset: () => {},
  });

  const load = async (
    _: Record<string, FilterValue | null>,
    search: string,
    setDataValue: (data: City[]) => void
  ) => {
    setLoading(true);

    const searchFilter: Filter = { Name: { contains: search } };

    const response = await get({
      select: ["id", "name", "country"],
      expand: {
        image: { select: ["id", "url", "name"] },
      },
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

  const createPlace = async (form: CityFormType) => {
    setLoading(true);
    const response = await create(form);

    if (response.ok) {
      message.success("City created");
      tableRef.current.reload();
    } else message.error(response.message);
    setLoading(false);
  };

  const editPlace = async (form: CityFormType, id: string) => {
    setLoading(true);
    const response = await edit(form, id);

    if (response.ok) {
      message.success("City edited");
      tableRef.current.reload();
    } else message.error(response.message);
    setLoading(false);
  };

  const deletePlace = async (id: string) => {
    setLoading(true);
    const response = await remove(id);

    if (response.ok) {
      message.success("City deleted");
      tableRef.current.reload();
    } else message.error(response.message);
    setLoading(false);
  };

  return (
    <>
      <div className="m-5">
        <Row justify="space-between" className="app-header">
          <Col>
            <Typography>
              <Title>Cities</Title>
            </Typography>
          </Col>
          <Col>
            <Button
              type="primary"
              disabled={loading}
              onClick={() => setCreateModal(true)}
            >
              Create
            </Button>
          </Col>
        </Row>
        <Row className="content-center m-10">
          <Col span={24}>
            <TableEntities
              ref={tableRef}
              title="Cities"
              loading={loading}
              columns={[
                {
                  title: "Name",
                  key: "name",
                  render: (v: City) => <>{v.name}</>,
                },
                {
                  title: "Country",
                  key: "country",
                  render: (v: City) => <>{v.country}</>,
                },
                {
                  title: "Actions",
                  key: "Actions",
                  render: (v: City) => (
                    <Row gutter={10}>
                      <Col>
                        <Tooltip title="Show">
                          <EyeOutlined
                            onClick={() => {
                              setSelected(v);
                              setShowModal(true);
                            }}
                          />
                        </Tooltip>
                      </Col>
                      <Col>
                        <Tooltip title="Edit">
                          <EditOutlined
                            onClick={() => {
                              setSelected(v);
                              setEditModal(true);
                            }}
                          />
                        </Tooltip>
                      </Col>
                      <Col>
                        <Tooltip title="Delete">
                          <DeleteOutlined
                            onClick={() => {
                              deletePlace(v.id);
                            }}
                          />
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
      <CityForm
        onOk={(form: CityFormType) => {
          setCreateModal(false);
          createPlace(form);
        }}
        onCancel={() => setCreateModal(false)}
        open={createModal}
      />
      {selected && (
        <CityForm
          onOk={(form: CityFormType) => {
            setEditModal(false);
            editPlace(form, selected.id);
          }}
          onCancel={() => setEditModal(false)}
          open={editModal}
          values={{
            name: selected.name,
            country: selected.country,
            image: selected.image,
          }}
        />
      )}
      {selected && (
        <ShowCity
          open={showModal}
          onOk={() => {
            setShowModal(false);
          }}
          city={selected}
        />
      )}
    </>
  );
};

export default CityApp;
