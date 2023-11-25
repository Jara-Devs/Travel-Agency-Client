import { Button, Col, Row, Tag, Tooltip, Typography, message } from "antd";
import { excursion, overNighExcursion } from "../../../api/services";
import { useRef, useState } from "react";
import Title from "antd/es/typography/Title";
import {
  Excursion,
  ExcursionFormType,
  OverNighExcursion,
  OverNighExcursionFormType,
} from "../../../types/services";
import TableEntities, { TableEntitiesRef } from "../../../common/TableEntities";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { FilterValue } from "antd/es/table/interface";
import { Filter } from "odata-query";
import ExcursionForm from "./ExcursionForm";
import ShowExcursion from "../../show/services/ShowExcursion";

const ExcursionApp = () => {
  const { get, create, edit, remove } = excursion();
  const {
    get: getOverNight,
    create: createOverNight,
    edit: editOverNight,
    remove: removeOverNight,
  } = overNighExcursion();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingOverNight, setLoadingOverNight] = useState<boolean>(false);
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);

  const [selected, setSelected] = useState<Excursion>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const tableRef = useRef<TableEntitiesRef>({
    reload: () => {},
    reset: () => {},
  });

  const tableRefOverNight = useRef<TableEntitiesRef>({
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
      and: [{ Name: { contains: search } }, { IsOverNight: { eq: false } }],
    };

    const response = await get({
      select: ["name", "id", "isOverNight"],
      expand: {
        activities: {
          select: ["id", "name", "description"],
          expand: { image: { select: ["id", "name", "url"] } },
        },
        places: {
          select: ["id", "name", "description"],
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

  const loadOverNight = async (
    _: Record<string, FilterValue | null>,
    search: string,
    setDataValue: (data: OverNighExcursion[]) => void
  ) => {
    setLoadingOverNight(true);

    const searchFilter: Filter = { Name: { contains: search } };

    const response = await getOverNight({
      select: ["name", "id", "hotelId", "isOverNight"],
      expand: {
        image: { select: ["id", "name", "url"] },
        activities: {
          select: ["id", "name", "description"],
          expand: { image: { select: ["id", "name", "url"] } },
        },
        places: {
          select: ["id", "name", "description"],
          expand: { image: { select: ["id", "name", "url"] } },
        },
        hotel: {
          select: ["id", "name", "category"],
          expand: { image: { select: ["id", "name", "url"] } },
        },
      },
      filter: searchFilter,
    });

    if (response.ok) {
      const data = response.value || [];
      setDataValue(data);
    } else {
      message.error(response.message);
    }
    setLoadingOverNight(false);
  };

  const createExcursion = async (
    form: ExcursionFormType,
    isOverNight: boolean = false
  ) => {
    if (isOverNight) setLoadingOverNight(true);
    else setLoading(true);

    const response = await (isOverNight
      ? createOverNight(form as OverNighExcursionFormType)
      : create(form));

    if (response.ok) {
      message.success("Excursion created");

      if (isOverNight) tableRefOverNight.current.reload();
      else tableRef.current.reload();
    } else message.error(response.message);

    if (isOverNight) setLoadingOverNight(false);
    else setLoading(false);
  };

  const editExcursion = async (
    form: ExcursionFormType,
    id: number,
    isOverNight: boolean = false
  ) => {
    if (isOverNight) setLoadingOverNight(true);
    else setLoading(true);

    const response = await (isOverNight
      ? editOverNight(form as OverNighExcursionFormType, id)
      : edit(form, id));

    if (response.ok) {
      message.success("Excursion edited");

      if (isOverNight) tableRefOverNight.current.reload();
      else tableRef.current.reload();
    } else message.error(response.message);

    if (isOverNight) setLoadingOverNight(false);
    else setLoading(false);
  };

  const deleteExcursion = async (id: number, isOverNight: boolean = false) => {
    if (isOverNight) setLoadingOverNight(true);
    else setLoading(true);
    const response = await (isOverNight ? removeOverNight(id) : remove(id));

    if (response.ok) {
      message.success("Excursion deleted");

      if (isOverNight) tableRefOverNight.current.reload();
      else tableRef.current.reload();
    } else message.error(response.message);

    if (isOverNight) setLoadingOverNight(false);
    else setLoading(false);
  };

  const getTable = (isOverNight: boolean) => {
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
                  deleteExcursion(v.id, v.isOverNight);
                }}
              />
            </Tooltip>
          </Col>
        </Row>
      ),
    };

    const hotelColumn = {
      title: "Hotel",
      key: "hotel",
      render: (v: OverNighExcursion) => <>{v.hotel.name}</>,
    };

    const columns = isOverNight
      ? [nameColumn, placesColumn, activitiesColumn, hotelColumn, actionsColumn]
      : [nameColumn, placesColumn, activitiesColumn, actionsColumn];

    return (
      <TableEntities
        ref={isOverNight ? tableRefOverNight : tableRef}
        title={isOverNight ? "OverNight Excursions" : "Excursions"}
        loading={isOverNight ? loadingOverNight : loading}
        columns={columns}
        load={isOverNight ? loadOverNight : load}
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
          <Col span={24}>{getTable(false)}</Col>
        </Row>
        <Row className="content-center m-10">
          <Col span={24}>{getTable(true)}</Col>
        </Row>
      </div>
      <ExcursionForm
        onOk={(form: ExcursionFormType, isOverNight: boolean) => {
          if (createModal) {
            setCreateModal(false);
            createExcursion(form, isOverNight);
          }
          if (editModal && selected != null) {
            setEditModal(false);
            editExcursion(form, selected.id, isOverNight);
          }
        }}
        create={createModal}
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
                hotelId: selected.isOverNight
                  ? (selected as OverNighExcursion).hotelId
                  : undefined,
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
