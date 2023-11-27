import {
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Typography,
} from "antd";
import { FC, useEffect, useState } from "react";
import { excursionOffer, flightOffer, hotelOffer } from "../../api/offers";
import { buildMessage } from "../../common/functions";
import {
  ExcursionOfferType,
  FlightOfferType,
  HotelOfferType,
} from "../../types/offers";
import { PackageFormType } from "../../types/packages";
import Title from "antd/es/typography/Title";

export interface PackageFormData {
  name: string;
  discount: number;
  description: string;
  hotelOffersId?: string[];
  excursionOffersId?: string[];
  flightOffersId?: string[];
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

  const [excursionOffers, setExcursionOffers] = useState<ExcursionOfferType[]>(
    []
  );
  const [flightOffers, setflightOffers] = useState<FlightOfferType[]>([]);
  const [hotelOffers, setHotelOffers] = useState<HotelOfferType[]>([]);

  const load = async () => {
    const responseHotelOffers = await hotelOffer().get({
      select: ["id", "name"],
    });
    const responseExcursionOffers = await excursionOffer().get({
      select: ["id", "name"],
    });
    const responseFlightOffers = await flightOffer().get({
      select: ["id", "name"],
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
  }, []);

  useEffect(() => {
    if (open) form.resetFields();
    if (values) {
      form.setFieldsValue({ ...values });
    }
  }, [open, form, values]);

  return (
    <Modal
      open={open}
      title={
        <Typography>
          <Title level={3}>Create Package</Title>
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
            (values.excursionOffersId ?? []).length +
              (values.flightOffersId ?? []).length +
              (values.hotelOffersId ?? []).length ===
            0
          ) {
            message.error("You most select an offer");
            return;
          }

          onOk({
            name: values.name,
            description: values.description,
            discount: values.discount,
            hotelOffersId: values.hotelOffersId ?? [],
            excursionOffersId: values.excursionOffersId ?? [],
            flightOffersId: values.flightOffersId ?? [],
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

        <Form.Item
          name="discount"
          label="Discount"
          rules={[{ required: true, message: "Introduce the discount" }]}
        >
          <InputNumber
            placeholder="Introduce the discount"
            min={0}
            max={100}
            defaultValue={10}
          />
        </Form.Item>

        <Form.Item name="hotelOffersId" label="Hotel Offers">
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

        <Form.Item name="excursionOffersId" label="Excursion Offers">
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

        <Form.Item name="flightOffersId" label="Flight Offers">
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
