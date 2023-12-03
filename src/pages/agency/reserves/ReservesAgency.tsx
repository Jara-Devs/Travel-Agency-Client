import { useState } from "react";
import { ReserveOnline, ReserveTicket } from "../../../types/reserves";
import { FilterValue } from "antd/es/table/interface";
import { reserveOnline, reserveTicket } from "../../../api/reserves";
import { Col, Row, Tag, Typography, message } from "antd";
import TableEntities from "../../../common/TableEntities";

const ReservesAgency = () => {
  const [loadingTicket, setLoadingTicket] = useState<boolean>(false);
  const [loadingOnline, setLoadingOnline] = useState<boolean>(false);

  const { get: getTicket } = reserveTicket();
  const { get: getOnline } = reserveOnline();

  const loadTicket = async (
    _: Record<string, FilterValue | null>,
    search: string,
    setDataValue: (data: ReserveTicket[]) => void
  ) => {
    setLoadingTicket(true);

    const filter = { package: { name: { contains: search } } };

    const response = await getTicket({
      select: ["cant"],
      expand: {
        user: { select: ["name", "email"] },
        payment: {
          select: ["price"],
          expand: {
            userIdentity: {
              select: ["name"],
            },
          },
        },
        package: {
          select: ["name", "isSingleOffer"],
        },
      },
      filter,
    });

    if (response.ok) setDataValue(response.value!);
    else message.error(response.message);

    setLoadingTicket(false);
  };

  const loadOnline = async (
    _: Record<string, FilterValue | null>,
    search: string,
    setDataValue: (data: ReserveOnline[]) => void
  ) => {
    setLoadingOnline(true);

    const filter = { package: { name: { contains: search } } };

    const response = await getOnline({
      select: ["cant"],
      expand: {
        user: { select: ["name", "email"] },
        payment: {
          select: ["price", "creditCard"],
        },
        package: {
          select: ["name", "isSingleOffer"],
        },
      },
      filter,
    });

    if (response.ok) setDataValue(response.value!);
    else message.error(response.message);

    setLoadingOnline(false);
  };

  return (
    <div className="m-5">
      <Row justify="space-between" className="app-header">
        <Col>
          <Typography>
            <Typography.Title>Reserves</Typography.Title>
          </Typography>
        </Col>
      </Row>
      <Row className="content-center m-10">
        <Col span={24}>
          <TableEntities
            loading={loadingTicket}
            title="Reserves Ticket"
            load={loadTicket}
            columns={[
              {
                title: "Package",
                key: "package",
                render: (v: ReserveTicket) => <>{v.package.name}</>,
              },
              {
                title: "Price",
                key: "price",
                render: (v: ReserveTicket) => <>{v.payment.price}</>,
              },
              {
                title: "Type",
                key: "type",
                render: (v: ReserveTicket) => (
                  <>
                    {v.package.isSingleOffer ? (
                      <Tag color="blue">Offer</Tag>
                    ) : (
                      <Tag color="green">Package</Tag>
                    )}
                  </>
                ),
              },
              {
                title: "Tourist",
                key: "tourist",
                render: (v: ReserveTicket) => (
                  <>{v.payment.userIdentity.name}</>
                ),
              },
              {
                title: "User agency",
                key: "userAgency",
                render: (v: ReserveTicket) => <>{v.user.name}</>,
              },
              {
                title: "User agency email",
                key: "email",
                render: (v: ReserveTicket) => <>{v.user.email}</>,
              },
              {
                title: "Cant",
                key: "cant",
                render: (v: ReserveTicket) => <>{v.cant}</>,
              },
            ]}
          />
        </Col>
      </Row>
      <Row className="content-center m-10">
        <Col span={24}>
          <TableEntities
            loading={loadingOnline}
            title="Reserves Online"
            load={loadOnline}
            columns={[
              {
                title: "Package",
                key: "package",
                render: (v: ReserveOnline) => <>{v.package.name}</>,
              },
              {
                title: "Price",
                key: "price",
                render: (v: ReserveOnline) => <>{v.payment.price}</>,
              },
              {
                title: "Type",
                key: "type",
                render: (v: ReserveOnline) => (
                  <>
                    {v.package.isSingleOffer ? (
                      <Tag color="blue">Offer</Tag>
                    ) : (
                      <Tag color="green">Package</Tag>
                    )}
                  </>
                ),
              },
              {
                title: "Tourist",
                key: "tourist",
                render: (v: ReserveOnline) => <>{v.user.name}</>,
              },
              {
                title: "Tourist email",
                key: "email",
                render: (v: ReserveOnline) => <>{v.user.email}</>,
              },
              {
                title: "Credit card",
                key: "creditCard",
                render: (v: ReserveOnline) => <>{v.payment.creditCard}</>,
              },
              {
                title: "Cant",
                key: "cant",
                render: (v: ReserveOnline) => <>{v.cant}</>,
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ReservesAgency;
