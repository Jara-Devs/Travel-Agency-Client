import {
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Typography,
} from "antd";
import { FC, useContext, useEffect, useState } from "react";
import { excursionOffer, flightOffer, hotelOffer } from "../../../api/offers";
import { buildMessage } from "../../../common/functions";
import {
  ExcursionOfferType,
  FlightOfferType,
  HotelOfferType,
} from "../../../types/offers";
import { PackageFormType } from "../../../types/packages";
import Title from "antd/es/typography/Title";
import { UserContext } from "../../../context/UserProvider";
import { UserAgencyContext } from "../../../types/auth";

export interface PackageFormData {
  name: string;
  discount: number;
  description: string;
  hotelOffers?: string[];
  excursionOffers?: string[];
  flightOffers?: string[];
}

export interface PackageFormProps {
  onOk: (form: PackageFormType) => void;
  onCancel: () => void;
  values?: PackageFormData;
  open: boolean;
}

export const PackageForm: FC<PackageFormProps> = ({
  onCancel,
  values,
  open,
  onOk,
}) => {
  const [form] = Form.useForm<PackageFormData>();
  const { user } = useContext(UserContext);

  const [excursionOffers, setExcursionOffers] = useState<ExcursionOfferType[]>(
    []
  );
  const [flightOffers, setflightOffers] = useState<FlightOfferType[]>([]);
  const [hotelOffers, setHotelOffers] = useState<HotelOfferType[]>([]);

  const [discount, setDiscount] = useState<number>(0);

  const load = async () => {
    const responseHotelOffers = await hotelOffer().get({
      select: ["id", "name"],
      filter: {
        agencyId: {
          eq: { type: "guid", value: (user as UserAgencyContext).agencyId },
        },
      },
    });
    const responseExcursionOffers = await excursionOffer().get({
      select: ["id", "name"],
      filter: {
        agencyId: {
          eq: { type: "guid", value: (user as UserAgencyContext).agencyId },
        },
      },
    });
    const responseFlightOffers = await flightOffer().get({
      select: ["id", "name"],
      filter: {
        agencyId: {
          eq: { type: "guid", value: (user as UserAgencyContext).agencyId },
        },
      },
    });

    if (
      responseHotelOffers.ok &&
      responseExcursionOffers.ok &&
      responseExcursionOffers.ok
    ) {
      setHotelOffers(responseHotelOffers.value!);
      setExcursionOffers(responseExcursionOffers.value!);
      setflightOffers(responseFlightOffers.value!);
    } else {
      message.error(
        buildMessage([
          responseExcursionOffers,
          responseFlightOffers,
          responseHotelOffers,
        ])
      );
    }
  };
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (open) form.resetFields();
    if (values) {
      form.setFieldsValue({ ...values });
      setDiscount(values.discount ?? 0);
    } else setDiscount(0);
  }, [open, form, values]);

  return (
    <Modal
      open={open}
      title={
        <Typography>
          <Title level={3}>Package</Title>
        </Typography>
      }
      onOk={form.submit}
      onCancel={onCancel}
    >
      <Form
        layout="vertical"
        style={{ marginTop: "20px" }}
        form={form}
        onFinish={(values: PackageFormData) => {
          if (
            (values.excursionOffers ?? []).length +
              (values.flightOffers ?? []).length +
              (values.hotelOffers ?? []).length ===
            0
          ) {
            message.error("You most select an offer");
            return;
          }

          onOk({
            name: values.name,
            description: values.description,
            discount,
            hotelOffers: values.hotelOffers ?? [],
            excursionOffers: values.excursionOffers ?? [],
            flightOffers: values.flightOffers ?? [],
          });
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Introduce the name" }]}
        >
          <Input placeholder="Introduce the name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Introduce the description" }]}
        >
          <Input placeholder="Introduce the description" />
        </Form.Item>

        <Form.Item name="discount" label="Discount">
          <InputNumber
            placeholder="Introduce the discount"
            min={0}
            max={100}
            value={discount}
            onChange={(value) => setDiscount(value ?? 0)}
            defaultValue={0}
          />
        </Form.Item>

        <Form.Item name="hotelOffers" label="Hotel Offers">
          <Select
            mode="multiple"
            allowClear
            filterOption={(input, option) => option?.label === input}
            options={hotelOffers.map((x) => ({
              value: x.id,
              label: x.name,
              key: x.id,
            }))}
            placeholder="Select the hotel offers"
          />
        </Form.Item>

        <Form.Item name="excursionOffers" label="Excursion Offers">
          <Select
            mode="multiple"
            allowClear
            filterOption={(input, option) => option?.label === input}
            options={excursionOffers.map((x) => ({
              value: x.id,
              label: x.name,
              key: x.id,
            }))}
            placeholder="Select the excursion offers"
          />
        </Form.Item>

        <Form.Item name="flightOffers" label="Flight Offers">
          <Select
            mode="multiple"
            allowClear
            filterOption={(input, option) => option?.label === input}
            options={flightOffers.map((x) => ({
              value: x.id,
              label: x.name,
              key: x.id,
            }))}
            placeholder="Select the flight offers"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
