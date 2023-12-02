import { FC, useState, useEffect } from "react";
import {
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Typography,
  message,
  InputNumber,
} from "antd";
import { Image } from "../../../../types/api";
import { Facility, FacilityType, Hotel } from "../../../../types/services";
import { hotel } from "../../../../api/services";
import UploadImage from "../../../../common/UploadImage";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";
import { HotelOfferFormType } from "../../../../types/offers";
import { facility } from "../../../../api/services";
import { buildMessage } from "../../../../common/functions";

export interface HotelFormProps {
  onOk: (form: HotelOfferFormType) => void;
  onCancel: () => void;
  values?: HotelOfferFormData;
  open: boolean;
}

export interface HotelOfferFormData {
  name: string;
  description: string;
  availability: number;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  image: Image;
  hotelId: string;
  price: number;
  facilities: string[];
}

const HotelOfferForm: FC<HotelFormProps> = ({
  onOk,
  onCancel,
  values,
  open,
}) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [hotelFacilities, setHotelFacilities] = useState<Facility[]>([]);
  const [form] = Form.useForm<HotelOfferFormData>();

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
  const [image, setImage] = useState<Image>();

  const load = async () => {
    const responseHotel = await hotel().get({
      select: ["id", "name", "category"],
    });

    const responseFacilities = await facility().get({
      select: ["id", "name"],
      filter: { type: FacilityType[FacilityType.Hotel] },
    });

    if (responseHotel.ok && responseFacilities.ok) {
      setHotels(responseHotel.value!);
      setHotelFacilities(responseFacilities.value!);
    } else {
      message.error(buildMessage([responseHotel, responseFacilities]));
    }
  };

  useEffect(() => {
    load();
  }, []);

  const disabledDateStart = (current: dayjs.Dayjs) => {
    return current && current < dayjs();
  };

  const disableEndDate = (current: dayjs.Dayjs) => {
    const startDate = form.getFieldValue("startDate");
    return current && current < startDate;
  };

  return (
    <Modal
      open={open}
      title={
        <Typography>
          <Title level={3}>Hotel Offer</Title>
        </Typography>
      }
      onOk={form.submit}
      onCancel={onCancel}
    >
      <Form
        layout="vertical"
        style={{ marginTop: "20px" }}
        form={form}
        onFinish={(values: HotelOfferFormData) => {
          if (image)
            onOk({
              name: values.name,
              hotelId: values.hotelId,
              price: values.price,
              availability: values.availability,
              startDate: values.startDate.valueOf(),
              endDate: values.endDate.valueOf(),
              description: values.description,
              imageId: image.id,
              facilities: values.facilities ?? [],
            });
          else {
            message.error("You must upload an image");
          }
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
          name="hotelId"
          label="Hotel"
          rules={[{ required: true, message: "Select the hotel" }]}
        >
          <Select
            allowClear
            filterOption={(input, option) => option?.label === input}
            options={hotels.map((x) => ({
              value: x.id,
              label: x.name,
              key: x.id,
            }))}
            placeholder="Select the hotel"
          />
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
          name="startDate"
          label="StartDate"
          rules={[{ required: true, message: "Select the startDate" }]}
        >
          <DatePicker
            disabledDate={disabledDateStart}
            allowClear={false}
            format={"DD/MM/YYYY"}
          />
        </Form.Item>

        <Form.Item
          name="endDate"
          label="EndDate"
          rules={[{ required: true, message: "Select the endDate" }]}
        >
          <DatePicker
            disabledDate={disableEndDate}
            allowClear={false}
            format={"DD/MM/YYYY"}
          />
        </Form.Item>

        <Form.Item name="facilities" label="Facilities">
          <Select
            mode="multiple"
            allowClear
            options={hotelFacilities.map((x) => ({
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

export default HotelOfferForm;

