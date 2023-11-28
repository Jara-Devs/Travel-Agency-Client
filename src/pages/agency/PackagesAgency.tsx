import { Button, Col, message, Row, Tag, Tooltip, Typography } from "antd";
import { FilterValue } from "antd/es/table/interface";
import { Filter } from "odata-query";
import { useState, useRef, useContext } from "react";
import { packageOffer } from "../../api/offers";
import { getPackagePrice } from "../../common/functions";
import TableEntities, { TableEntitiesRef } from "../../common/TableEntities";
import { UserContext } from "../../context/UserProvider";
import { UserAgencyContext } from "../../types/auth";
import { Package, PackageFormType } from "../../types/packages";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { PackageForm } from "./PackagesForm";
import ShowPackage from "../show/offers/ShowPackage";

const PackagesAgency = () => {
  const { get, create, edit, remove } = packageOffer();
  const [loading, setLoading] = useState<boolean>(false);

  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);

  const [selected, setSelected] = useState<Package>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const tableRef = useRef<TableEntitiesRef>({
    reload: () => {},
    reset: () => {},
  });
  const { user } = useContext(UserContext);

  const load = async (
    _: Record<string, FilterValue | null>,
    search: string,
    setDataValue: (data: Package[]) => void
  ) => {
    setLoading(true);
    const searchFilter: Filter = { Name: { contains: search } };
    const finalFilter: Filter = {
      and: [
        searchFilter,
        {
          flightOffers: {
            all: {
              agencyId: {
                eq: {
                  type: "guid",
                  value: (user as UserAgencyContext).agencyId,
                },
              },
            },
          },
        },
      ],
    };

    const response = await get({
      expand: {
        flightOffers: {
          select: ["id", "name", "description", "price", "type"],
          expand: { image: { select: ["id", "name", "url"] } },
        },
        hotelOffers: {
          select: ["id", "name", "description", "price", "type"],
          expand: { image: { select: ["id", "name", "url"] } },
        },
        excursionOffers: {
          select: ["id", "name", "description", "price", "type"],
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

  const createPackage = async (form: PackageFormType) => {
    setLoading(true);
    const response = await create(form);

    if (response.ok) {
      message.success("Package created");
      tableRef.current.reload();
    } else message.error(response.message);
    setLoading(false);
  };

  const editPackage = async (form: PackageFormType, id: string) => {
    setLoading(true);
    const response = await edit(form, id);

    if (response.ok) {
      message.success("Package edited");
      tableRef.current.reload();
    } else message.error(response.message);
    setLoading(false);
  };

  const deletePackage = async (id: string) => {
    setLoading(true);
    const response = await remove(id);

    if (response.ok) {
      message.success("Package deleted");
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
              <Typography.Title>Packages</Typography.Title>
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
              title="Packages"
              loading={loading}
              columns={[
                {
                  title: "Name",
                  key: "name",
                  render: (v: Package) => <>{v.name}</>,
                },
                {
                  title: "Discount",
                  key: "discount",
                  render: (v: Package) => <>{`${v.discount}% `}</>,
                },

                {
                  title: "HotelOffers",
                  key: "hotelOffers",
                  render: (v: Package) => (
                    <>
                      <Row>
                        {v.hotelOffers.map((f, idx) => (
                          <Tag key={idx} color="blue">
                            {f.name}
                          </Tag>
                        ))}
                      </Row>
                    </>
                  ),
                },
                {
                  title: "FlightOffers",
                  key: "flightOffers",
                  render: (v: Package) => (
                    <>
                      <Row>
                        {v.flightOffers.map((f, idx) => (
                          <Tag key={idx} color="green">
                            {f.name}
                          </Tag>
                        ))}
                      </Row>
                    </>
                  ),
                },
                {
                  title: "ExcursionOffers",
                  key: "excursionOffers",
                  render: (v: Package) => (
                    <>
                      <Row>
                        {v.excursionOffers.map((f, idx) => (
                          <Tag key={idx} color="yellow">
                            {f.name}
                          </Tag>
                        ))}
                      </Row>
                    </>
                  ),
                },

                {
                  title: "Price",
                  key: "price",
                  render: (v: Package) => <>{`$ ${getPackagePrice(v)}`}</>,
                },

                {
                  title: "Actions",
                  key: "Actions",
                  render: (v: Package) => (
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
                              deletePackage(v.id);
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
      <PackageForm
        onOk={(form: PackageFormType) => {
          setCreateModal(false);
          console.log(form);
          createPackage(form);
        }}
        onCancel={() => setCreateModal(false)}
        open={createModal}
      />
      {selected && (
        <PackageForm
          onOk={(form: PackageFormType) => {
            setEditModal(false);
            editPackage(form, selected.id);
          }}
          onCancel={() => setEditModal(false)}
          open={editModal}
          values={{
            name: selected.name,
            description: selected.description,
            discount: selected.discount,
            hotelOffers: selected.hotelOffers.map((x) => x.id),
            flightOffers: selected.flightOffers.map((x) => x.id),
            excursionOffers: selected.excursionOffers.map((x) => x.id),
          }}
        />
      )}
      {selected && (
        <ShowPackage
          open={showModal}
          onOk={() => {
            setShowModal(false);
          }}
          packageOffer={selected}
        />
      )}
    </>
  );
};

export default PackagesAgency;
