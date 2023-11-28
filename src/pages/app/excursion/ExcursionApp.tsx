import { Button, Col, Row, Tag, Tooltip, Typography, message } from "antd";
import { excursion } from "../../../api/services";
import { useRef, useState } from "react";
import Title from "antd/es/typography/Title";
import { Excursion, ExcursionFormType } from "../../../types/services";
import TableEntities, { TableEntitiesRef } from "../../../common/TableEntities";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { FilterValue } from "antd/es/table/interface";
import { Filter } from "odata-query";
import ExcursionForm from "./ExcursionForm";
import ShowExcursion from "../../show/services/ShowExcursion";

const ExcursionApp = () => {
  const { get, create, edit, remove } = excursion();
  const [loading, setLoading] = useState<boolean>(false);
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);

  const [selected, setSelected] = useState<Excursion>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const tableRef = useRef<TableEntitiesRef>({
    reload: () => {},
    reset: () => {},
  });

  const load = async (
    _: Record<string, FilterValue | null>,
    search: string,
    setDataValue: (data: Excursion[]) => void
  ) => {
    setLoading(true);

    const searchFilter: Filter = {
      name: { contains: search },
    };

    const response = await get({
      select: ["name", "id"],
      expand: {
        activities: {
          select: ["id", "name", "description"],
          expand: { image: { select: ["id", "name", "url"] } },
        },
        places: {
          select: ["id", "name", "description"],
          expand: { image: { select: ["id", "name", "url"] } },
        },
        hotels: {
          select: ["id", "name", "category"],
          expand: { image: { select: ["id", "name", "url"] } },
        },
        image: { select: ["id", "name", "url"] },
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

  const createExcursion = async (form: ExcursionFormType) => {
    setLoading(true);

    const response = await create(form);

    if (response.ok) {
      message.success("Excursion created");

      tableRef.current.reload();
    } else message.error(response.message);

    setLoading(false);
  };

  const editExcursion = async (form: ExcursionFormType, id: string) => {
    setLoading(true);

    const response = await edit(form, id);

    if (response.ok) {
      message.success("Excursion edited");

      tableRef.current.reload();
    } else message.error(response.message);

    setLoading(false);
  };

  const deleteExcursion = async (id: string) => {
    setLoading(true);
    const response = await remove(id);

    if (response.ok) {
      message.success("Excursion deleted");

      tableRef.current.reload();
    } else message.error(response.message);

    setLoading(false);
  };

  const getTable = () => {
    const nameColumn = {
      title: "Name",
      key: "name",
      render: (v: Excursion) => <>{v.name}</>,
    };

    const placesColumn = {
      title: "Places",
      key: "places",
      render: (v: Excursion) => (
        <>
          {v.places.map((x, ids) => (
            <Tag key={ids} color="blue">
              {x.name}
            </Tag>
          ))}
        </>
      ),
    };

    const activitiesColumn = {
      title: "Activities",
      key: "activities",
      render: (v: Excursion) => (
        <>
          {v.activities.map((x, ids) => (
            <Tag key={ids} color="green">
              {x.name}
            </Tag>
          ))}
        </>
      ),
    };

    const hotelsColumn = {
      title: "Hotels",
      key: "hotels",
      render: (v: Excursion) => (
        <>
          {v.hotels.map((x, ids) => (
            <Tag key={ids} color="red">
              {x.name}
            </Tag>
          ))}
        </>
      ),
    };

    const actionsColumn = {
      title: "Actions",
      key: "Actions",
      render: (v: Excursion) => (
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
                  deleteExcursion(v.id);
                }}
              />
            </Tooltip>
          </Col>
        </Row>
      ),
    };

    const columns = [
      nameColumn,
      placesColumn,
      activitiesColumn,
      hotelsColumn,
      actionsColumn,
    ];

    return (
      <TableEntities
        ref={tableRef}
        title={"Excursions"}
        loading={loading}
        columns={columns}
        load={load}
      />
    );
  };

  return (
    <>
      <div className="m-5">
        <Row justify="space-between" className="app-header">
          <Col>
            <Typography>
              <Title>Excursions</Title>
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
          <Col span={24}>{getTable()}</Col>
        </Row>
      </div>
      <ExcursionForm
        onOk={(form: ExcursionFormType) => {
          if (createModal) {
            setCreateModal(false);
            createExcursion(form);
          }
          if (editModal && selected != null) {
            setEditModal(false);
            editExcursion(form, selected.id);
          }
        }}
        onCancel={() => {
          if (createModal) setCreateModal(false);
          if (editModal) setEditModal(false);
        }}
        open={createModal || editModal}
        values={
          editModal && selected != null
            ? {
                name: selected.name,
                places: selected.places.map((x) => x.id),
                activities: selected.activities.map((x) => x.id),
                hotels: selected.hotels.map((x) => x.id),
                image: selected.image,
              }
            : undefined
        }
      />
      {selected && (
        <ShowExcursion
          open={showModal}
          onOk={() => {
            setSelected(undefined);
            setShowModal(false);
          }}
          excursion={selected}
        />
      )}
    </>
  );
};

export default ExcursionApp;
