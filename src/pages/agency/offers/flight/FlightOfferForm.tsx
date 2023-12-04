import { Facility, FacilityType, Flight } from "../../../../types/services";
import { FlightOfferFormType } from "../../../../types/offers";
import { FC, useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Modal,
  Select,
  Typography,
  message,
} from "antd";
import { flight } from "../../../../api/services";
import { Image } from "../../../../types/api";
import Title from "antd/es/typography/Title";
import UploadImage from "../../../../common/UploadImage";
import dayjs from "dayjs";
import { facility } from "../../../../api/services";
import { buildMessage } from "../../../../common/functions";

export interface FlightOfferFormData {
  name: string;
  flightId: string;
  availability: number;
  description: string;
  price: number;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  facilities: string[];
  image: Image;
}

export interface FlightOfferFormProps {
  onOk: (form: FlightOfferFormType) => void;
  onCancel: () => void;
  values?: FlightOfferFormData;
  open: boolean;
}

export const flightLabel = (x: Flight) =>
  `Company ${x.company}, From ${x.origin.name} to ${x.destination.name}`;

const FlightOfferForm: FC<FlightOfferFormProps> = ({
  onOk,
  onCancel,
  values,
  open,
}) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [flightFacilities, setFlightFacilities] = useState<Facility[]>([]);
  const [form] = Form.useForm<FlightOfferFormData>();

  const [image, setImage] = useState<Image>();

  useEffect(() => {
    if (open) form.resetFields();
    if (values) {
      form.setFieldsValue({ ...values });
      setImage(values.image);
    } else {
      form.setFieldsValue({ price: 0.01, availability: 1 });
      setImage(undefined);
    }
  }, [open, form, values]);

  const dateFormat = "YYYY-MM-DD HH:mm";

  const load = async () => {
    const responseFlight = await flight().get({
      select: ["id", "company"],
      expand: {
        origin: { select: ["name"] },
        destination: { select: ["name"] },
      },
    });

    const responseFacilities = await facility().get({
      select: ["id", "name"],
      filter: { type: FacilityType[FacilityType.Flight] },
    });

    if (responseFlight.ok && responseFacilities.ok) {
      setFlights(responseFlight.value!);
      setFlightFacilities(responseFacilities.value!);
    } else {
      message.error(buildMessage([responseFlight, responseFacilities]));
    }
  };

  const disabledDateStart = (current: dayjs.Dayjs) => {
    return current && current < dayjs();
  };

  const disableEndDate = (current: dayjs.Dayjs) => {
    const startDate = form.getFieldValue("startDate");
    return current && current < startDate;
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Modal
      open={open}
      title={
        <Typography>
          <Title level={3}>Flight Offer</Title>
        </Typography>
      }
      onOk={form.submit}
      onCancel={onCancel}
    >
      <Form
        layout="vertical"
        style={{ marginTop: "20px" }}
        form={form}
        onFinish={(values: FlightOfferFormData) => {
          if (image)
            onOk({
              name: values.name,
              flightId: values.flightId,
              availability: values.availability,
              description: values.description,
              price: values.price,
              startDate: values.startDate.valueOf(),
              endDate: values.endDate.valueOf(),
              facilities: values.facilities ?? [],
              imageId: image.id,
            });
          else message.error("You must upload an image");
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
          name="flightId"
          label="Flight"
          rules={[{ required: true, message: "Select the flight" }]}
        >
          <Select
            style={{ width: "100%" }}
            showSearch
            allowClear
            filterOption={(input, option) =>
              (option?.label
                ?.toString()
                ?.toLowerCase()
                ?.indexOf(input.toLowerCase()) ?? -1) >= 0
            }
            options={flights.map((x) => ({
              value: x.id,
              label: `Company ${x.company}, From ${x.origin.name} to ${x.destination.name}`,
              key: x.id,
            }))}
            placeholder="Select the flight"
          />
        </Form.Item>

        <Form.Item
          name="availability"
          label="Availability"
          rules={[{ required: true, message: "Introduce the availability" }]}
        >
          <InputNumber
            placeholder="Introduce the availability"
            min={1}
            max={999}
            defaultValue={1}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Introduce the description" }]}
        >
          <Input.TextArea placeholder="Introduce the description" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Introduce the price" }]}
        >
          <InputNumber<string>
            style={{ width: 200 }}
            defaultValue="0.01"
            min="0.01"
            step="0.01"
            stringMode
            placeholder="Introduce the price"
          />
        </Form.Item>

        <Form.Item
          name="startDate"
          label="Initial Date"
          rules={[
            {
              required: true,
              message: "Introduce the initial date",
            },
          ]}
        >
          <DatePicker
            showTime
            placeholder="Introduce the initial date"
            format={dateFormat}
            disabledDate={disabledDateStart}
          />
        </Form.Item>

        <Form.Item
          name="endDate"
          label="Final Date"
          rules={[
            {
              required: true,
              message: "Introduce the final date",
            },
          ]}
        >
          <DatePicker
            showTime
            placeholder="Introduce the final date"
            format={dateFormat}
            disabledDate={disableEndDate}
          />
        </Form.Item>

        <Form.Item name="facilities" label="Facilities">
          <Select
            mode="multiple"
            allowClear
            showSearch
            filterOption={(input, option) =>
              (option?.label
                ?.toString()
                ?.toLowerCase()
                ?.indexOf(input.toLowerCase()) ?? -1) >= 0
            }
            options={flightFacilities.map((x) => ({
              value: x.id,
              label: x.name,
              key: x.id,
            }))}
            placeholder="Select the facilities"
          />
        </Form.Item>

        <UploadImage setImage={setImage} image={image} />
      </Form>
    </Modal>
  );
};

export default FlightOfferForm;
