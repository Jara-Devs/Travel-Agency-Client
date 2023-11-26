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
import { ApiResponse, Image } from "../../../../types/api";
import {
  Hotel,
  HotelFacility,
  HotelOfferFormType,
} from "../../../../types/services";
import { hotel } from "../../../../api/services";
import UploadImage from "../../../../common/UploadImage";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";

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
  hotelId: number;
  price: number;
  facilities: number[];
}

const HotelOfferForm: FC<HotelFormProps> = ({
  onOk,
  onCancel,
  values,
  open,
}) => {
  const [_hotel, setHotel] = useState<Hotel[]>([]);
  // const [selectedStartDate, setSelectedStartDate] = useState<number>();
  // const [selectedEndDate, setSelectedEndDate] = useState<number>();

  const [form] = Form.useForm<HotelOfferFormData>();

  useEffect(() => {
    if (open) form.resetFields();
    if (values) {
      form.setFieldsValue({ ...values });
      console.log(values.startDate);
      setImage(values.image);
    } else {
      setImage(undefined);
    }
  }, [open, form, values]);
  const [image, setImage] = useState<Image>();

  const load = async () => {
    const responseHotel = await hotel().get({
      select: ["id", "name", "category"],
    });

    if (responseHotel.ok) {
      setHotel(responseHotel.value!);
    } else {
      let msg = "";

      const aux = (response: ApiResponse<any>) => {
        if (!responseHotel.ok) {
          if (msg.length === 0) msg = response.message;
          else msg = `${message}, ${response.message}`;
        }
      };

      aux(responseHotel);

      message.error(msg);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // const startDateChange: DatePickerProps["onChange"] = (date, dateString) => {
  //   a = date?.valueOf();

  //   console.log(a);
  // };
  // const endDateChange: DatePickerProps["onChange"] = (date, datestring) => {
  //   setSelectedEndDate(date?.valueOf());
  // };

  return (
    <Modal
      open={open}
      title={
        <Typography>
          <Title level={3}>Create Hotel</Title>
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
              facilities: values.facilities,
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
            options={_hotel.map((x) => ({
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
          <Input placeholder="Introduce the description" />
        </Form.Item>

        <Form.Item
          name="startDate"
          label="StartDate"
          rules={[{ required: true, message: "Select the startDate" }]}
        >
          <DatePicker allowClear={false} format={"DD/MM/YYYY"} />
        </Form.Item>

        <Form.Item
          name="endDate"
          label="EndDate"
          rules={[{ required: true, message: "Select the endDate" }]}
        >
          <DatePicker />
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
              HotelFacility.AirConditioning,
              HotelFacility.AirportShuttle,
              HotelFacility.Bar,
              HotelFacility.ChildCare,
              HotelFacility.FacilitiesForDisabledGuests,
              HotelFacility.Garden,
              HotelFacility.Gym,
              HotelFacility.Parking,
              HotelFacility.PetFriendly,
              HotelFacility.Pool,
              HotelFacility.Restaurant,
              HotelFacility.RoomService,
              HotelFacility.Shops,
              HotelFacility.Spa,
              HotelFacility.Wifi,
            ].map((x) => ({
              value: x,
              label: HotelFacility[x],
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

export default HotelOfferForm;

// onChange={endDateChange}
// onChange={startDateChange}
