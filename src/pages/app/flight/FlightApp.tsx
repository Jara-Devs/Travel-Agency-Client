import { Button, Col, Row, Tooltip, Typography, message } from "antd";
import { flight } from "../../../api/services";
import { useRef, useState } from "react";
import Title from "antd/es/typography/Title";
import { Flight, FlightFormType } from "../../../types/services";
import TableEntities, { TableEntitiesRef } from "../../../common/TableEntities";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { Filter } from "odata-query";
import ShowFlight, { buildDuration } from "../../show/services/ShowFlight";
import FlightForm from "./FlightForm";
import { anyOfferPackage, buildFilter } from "../../../common/service/filter";

const FlightApp = () => {
  const { get, create, edit, remove } = flight();
  const [loading, setLoading] = useState<boolean>(false);

  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);

  const [selected, setSelected] = useState<Flight>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const tableRef = useRef<TableEntitiesRef>({
    reload: () => {},
    reset: () => {},
  });

  const load = async (
    filter: Record<string, string>,
    search: string,
    setDataValue: (data: Flight[]) => void
  ) => {
    setLoading(true);

    const searchFilter: Filter = { Company: { contains: search } };
    const finalFilter = { and: [searchFilter, buildFilter(filter)] };

    const response = await get({
      select: ["id", "duration", "company", "originId", "destinationId"],
      expand: {
        origin: {
          select: ["name", "country"],
          expand: { image: { select: ["id", "name", "url"] } },
        },
        destination: {
          select: ["name", "country"],
          expand: { image: { select: ["id", "name", "url"] } },
        },
      },

      filter: finalFilter,
    });

    if (response.ok) {
      const data = response.value || [];
      setDataValue(data);
    } else {
      message.error(response.message);
    }
    setLoading(false);
  };

  const createFlight = async (form: FlightFormType) => {
    setLoading(true);
    const response = await create(form);

    if (response.ok) {
      message.success("Flight created");
      tableRef.current.reload();
    } else message.error(response.message);
    setLoading(false);
  };

  const editFlight = async (form: FlightFormType, id: string) => {
    setLoading(true);
    const response = await edit(form, id);

    if (response.ok) {
      message.success("Flight edited");
      tableRef.current.reload();
    } else message.error(response.message);
    setLoading(false);
  };

  const deleteFlight = async (id: string) => {
    setLoading(true);
    const response = await remove(id);

    if (response.ok) {
      message.success("Flight deleted");
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
              <Title>Flights</Title>
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
              filters={[anyOfferPackage]}
              ref={tableRef}
              title="Flights"
              loading={loading}
              columns={[
                {
                  title: "Company",
                  key: "company",
                  render: (v: Flight) => <>{v.company}</>,
                },
                {
                  title: "Origin",
                  key: "origin",
                  render: (v: Flight) => <>{v.origin.name}</>,
                },
                {
                  title: "Destination",
                  key: "destination",
                  render: (v: Flight) => <>{v.destination.name}</>,
                },
                {
                  title: "Duration",
                  key: "duration",
                  render: (v: Flight) => {
                    return <>{buildDuration(v)}</>;
                  },
                },

                {
                  title: "Actions",
                  key: "Actions",
                  render: (v: Flight) => (
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
                              deleteFlight(v.id);
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
      <FlightForm
        onOk={(form: FlightFormType) => {
          setCreateModal(false);
          createFlight(form);
        }}
        onCancel={() => setCreateModal(false)}
        open={createModal}
      />
      {selected && (
        <FlightForm
          onOk={(form: FlightFormType) => {
            setEditModal(false);
            editFlight(form, selected.id);
          }}
          onCancel={() => setEditModal(false)}
          open={editModal}
          values={{
            company: selected.company,
            duration: selected.duration,
            originId: selected.originId,
            destinationId: selected.destinationId,
          }}
        />
      )}
      {selected && (
        <ShowFlight
          open={showModal}
          onOk={() => {
            setShowModal(false);
          }}
          flight={selected}
        />
      )}
    </>
  );
};

export default FlightApp;
