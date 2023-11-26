import { Excursion } from "../../../../types/services";
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
import { excursion } from "../../../../api/services";
import { Image } from "../../../../types/api";
import Title from "antd/es/typography/Title";
import UploadImage from "../../../../common/UploadImage";
import dayjs from "dayjs";
import { getExcursionFacility } from "../../../../common/functions";
import { ExcursionFacility, ExcursionOfferFormType } from "../../../../types/offers";

export interface ExcursionOfferFormData {
  name: string;
  excursionId: number;
  availability: number;
  description: string;
  price: number;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  facilities: number[];
  image: Image;
}

export interface FlightOfferFormProps {
  onOk: (form: ExcursionOfferFormType) => void;
  onCancel: () => void;
  values?: ExcursionOfferFormData;
  open: boolean;
}

export const excursionLabel = (x: Excursion) => `Excursion ${x.name}`;

const FlightOfferForm: FC<FlightOfferFormProps> = ({
  onOk,
  onCancel,
  values,
  open,
}) => {
  const [Excursion, setExcursion] = useState<Excursion[]>([]);
  const [form] = Form.useForm<ExcursionOfferFormData>();

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

  const dateFormat = "DD/MM/YYYY";

  const load = async () => {
    const responseExcursion = await excursion().get({
      select: ["id", "name"],
      expand: {
        image: {
          select: ["id", "name", "url"],
        },
        places: {
          select: ["id", "name"],
        },
        activities: {
          select: ["id", "name"],
        },
      },
    });

    if (responseExcursion.ok) {
      setExcursion(responseExcursion.value!);
    } else {
      message.error(responseExcursion.message);
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
          <Title level={3}>Create Excursion Offer</Title>
        </Typography>
      }
      onOk={form.submit}
      onCancel={onCancel}
    >
      <Form
        layout="vertical"
        style={{ marginTop: "20px" }}
        form={form}
        onFinish={(values: ExcursionOfferFormData) => {
          if (image)
            onOk({
              name: values.name,
              excursionId: values.excursionId,
              availability: values.availability,
              description: values.description,
              price: values.price,
              startDate: values.startDate.valueOf(),
              endDate: values.endDate.valueOf(),
              facilities: values.facilities,
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
          name="excursionId"
          label="Excursion"
          rules={[{ required: true, message: "Select the excursion" }]}
        >
          <Select
            style={{ width: "100%" }}
            showSearch
            allowClear
            filterOption={(input, option) => option?.label === input}
            options={Excursion.map((x) => ({
              value: x.id,
              label: `${x.name}`,
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
          <Input placeholder="Introduce the description" />
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
            placeholder="Introduce the final date"
            format={dateFormat}
            disabledDate={disableEndDate}
          />
        </Form.Item>

        <Form.Item
          name="facilities"
          label="Facilities"
          rules={[{ required: true, message: "Select the facilities" }]}
        >
          <Select
            mode="multiple"
            allowClear
            options={[
              ExcursionFacility.TourGuides,
              ExcursionFacility.Transportation,
              ExcursionFacility.Communication,
              ExcursionFacility.Meals,
              ExcursionFacility.Drinks,
              ExcursionFacility.EntranceTickets,
              ExcursionFacility.EnvironmentalEducation,
              ExcursionFacility.Equipment,
              ExcursionFacility.FreeTime,
              ExcursionFacility.RecreationalActivities,
              ExcursionFacility.SafetyAndFirstAid,
            ].map((x) => ({
              value: x,
              label: getExcursionFacility(x),
              key: x,
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
