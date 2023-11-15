import { Button, Col, Row, Tooltip, Typography, message } from "antd";
import { excursion, overNighExcursion } from "../../api/services";
import { useRef, useState } from "react";
import Title from "antd/es/typography/Title";
import {
  Excursion,
  ExcursionFormType,
  OverNighExcursion,
  OverNighExcursionFormType,
} from "../../types/sevice";
import TableEntities, { TableEntitiesRef } from "../../common/TableEntities";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { FilterValue } from "antd/es/table/interface";
import { Filter } from "odata-query";
import ExcursionForm from "./ExcursionForm";

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

    const searchFilter: Filter = { Name: { contains: search } };

    const response = await get({
      select: ["Name", "Id"],
      expand: {
        Activities: {
          select: ["Id", "Name"],
        },
        Places: {
          select: ["Id", "Name"],
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
      select: ["Name", "Id", "HotelId"],
      expand: {
        Activities: {
          select: ["Id", "Name"],
        },
        Places: {
          select: ["Id", "Name"],
        },
        Hotel: {
          select: ["Id", "Name"],
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
      render: (v: Excursion) => <>{v.Name}</>,
    };

    const actionsColumn = {
      title: "Actions",
      key: "Actions",
      render: (v: Excursion) => (
        <Row gutter={10}>
          <Col>
            <Tooltip title="Show">
              <EyeOutlined />
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
                  deleteExcursion(v.Id);
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
      render: (v: OverNighExcursion) => <>{v.Hotel.Name}</>,
    };

    const columns = isOverNight
      ? [nameColumn, hotelColumn, actionsColumn]
      : [nameColumn, actionsColumn];

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
          setCreateModal(false);
          createExcursion(form, isOverNight);
        }}
        create={true}
        onCancel={() => setCreateModal(false)}
        open={createModal}
      />
      {selected && (
        <ExcursionForm
          create={false}
          onOk={(form: ExcursionFormType, isOverNight: boolean) => {
            setEditModal(false);
            editExcursion(form, selected.Id, isOverNight);
          }}
          onCancel={() => setEditModal(false)}
          open={editModal}
          values={{
            name: selected.Name,
            places: selected.Places.map((x) => x.Id),
            activities: selected.Activities.map((x) => x.Id),
            hotelId: selected.IsOverNight
              ? (selected as OverNighExcursion).HotelId
              : undefined,
          }}
        />
      )}
    </>
  );
};

export default ExcursionApp;
