import { Button, Col, Row, Tooltip, Typography, message } from "antd";
import { excursion, overNighExcursion, touristPlace } from "../../api/services";
import { useRef, useState } from "react";
import Title from "antd/es/typography/Title";
import {
  Excursion,
  OverNighExcursion,
  isOverNightExcursion,
} from "../../types/sevice";
import TableEntities, { TableEntitiesRef } from "../../common/TableEntities";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { FilterValue } from "antd/es/table/interface";
import { Filter } from "odata-query";

const ExcursionApp = () => {
  const { get, create, edit, remove } = excursion();
  const {
    get: getOverNight,
    create: createOverNight,
    edit: editOverNight,
    remove: removeOverNight,
  } = overNighExcursion();
  const [loading, setLoading] = useState<boolean>(false);

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
    setLoading(true);

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
    setLoading(false);
  };

  //   const createPlace = async (form: TouristPlaceForm) => {
  //     setLoading(true);
  //     const response = await create(form);

  //     if (response.ok) {
  //       message.success("Place created");
  //       tableRef.current.reload();
  //     } else message.error(response.message);
  //     setLoading(false);
  //   };

  //   const editPlace = async (form: TouristPlaceForm, id: number) => {
  //     setLoading(true);
  //     const response = await edit(form, id);

  //     if (response.ok) {
  //       message.success("Place edited");
  //       tableRef.current.reload();
  //     } else message.error(response.message);
  //     setLoading(false);
  //   };

  //   const deletePlace = async (id: number) => {
  //     setLoading(true);
  //     const response = await remove(id);

  //     if (response.ok) {
  //       message.success("Place deleted");
  //       tableRef.current.reload();
  //     } else message.error(response.message);
  //     setLoading(false);
  //   };

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
                  //   deletePlace(v.Id);
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
        loading={loading}
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
              <Title>Places</Title>
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
      {/* <PlaceForm
        onOk={(form: TouristPlaceForm) => {
          setCreateModal(false);
          createPlace(form);
        }}
        onCancel={() => setCreateModal(false)}
        open={createModal}
      />
      {selected && (
        <PlaceForm
          onOk={(form: TouristPlaceForm) => {
            setEditModal(false);
            editPlace(form, selected.Id);
          }}
          onCancel={() => setEditModal(false)}
          open={editModal}
          values={{
            name: selected.Name,
            description: selected.Description,
            address: selected.Address.Description,
            city: selected.Address.City,
            country: selected.Address.Country,
          }}
        />
      )} */}
    </>
  );
};

export default ExcursionApp;
