import { Flight, FlightOfferFormType } from "../../../types/services";
import { FC, useState, useEffect } from "react";
import { Col, Form, Input, InputNumber, DatePicker, Modal, Row, Select, Typography, message } from "antd";
import { flight } from "../../../api/services";
import { ApiResponse, Image } from "../../../types/api";
import Title from "antd/es/typography/Title";
import UploadImage from "../../../common/UploadImage";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { DatePickerProps } from 'antd';

dayjs.extend(customParseFormat);

export interface FlightOfferFormData {
    name: string;
    flightId: number;
    availability: number;
    description: string;
    price: number;
    startDate: Date;
    endDate: Date;
    facilities: string[];
    imageId: number;
}

export interface FlightOfferFormProps {
    onOk: (form: FlightOfferFormType) => void;
    onCancel: () => void;
    values?: FlightOfferFormData;
    open: boolean;
}

const FlightOfferForm: FC<FlightOfferFormProps> = ({ onOk, onCancel, values, open }) => {

    const [Flight, setFlight] = useState<Flight[]>([]);
    const [form] = Form.useForm<FlightOfferFormData>();

    useEffect(() => {
        if (open) form.resetFields();
    }, [open, form, values]);

    const [image, setImage] = useState<Image>();

    const { RangePicker } = DatePicker;

    const dateFormat = 'YYYY/MM/DD';
    const weekFormat = 'MM/DD';
    const monthFormat = 'YYYY/MM';

    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

    const customFormat: DatePickerProps['format'] = (value) =>
        `custom format: ${value.format(dateFormat)}`;

    const customWeekStartEndFormat: DatePickerProps['format'] = (value) =>
        `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value)
            .endOf('week')
            .format(weekFormat)}`;

    const load = async () => {
        const responseFlight = await flight().get({ select: ["id", "company", "origin", "destination", "flightCategory"] });

        if (responseFlight.ok) {
            setFlight(responseFlight.value!);
        } else {
            let msg = "";

            const aux = (response: ApiResponse<any>) => {
                if (!responseFlight.ok) {
                    if (msg.length === 0) msg = response.message;
                    else msg = `${message}, ${response.message}`;
                }
            };

            aux(responseFlight);

            message.error(msg);
        }
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <Modal
            open={open}
            title={
                <Typography>
                    <Title level={3}>Create Flight Offer</Title>
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
                    onOk({
                        name: values.name,
                        flightId: values.flightId,
                        availability: values.availability,
                        description: values.description,
                        price: values.price,
                        startDate: values.startDate,
                        endDate: values.endDate,
                        facilities: values.facilities,
                        imageId: values.imageId
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

                <Select
                    allowClear
                    filterOption={(input, option) => option?.label === input}
                    options={Flight.map((x) => ({
                        value: x.id,
                        label: x.company + ": " + x.origin.name + "-" + x.destination.name + " " + x.flightCategory,
                        key: x.id,
                    }))}
                    placeholder="Select the flight"
                />

                <Form.Item
                    name="availability"
                    label="Availability"
                    rules={[{ required: true, message: "Introduce the availability" }]}
                >
                    <InputNumber min={1} max={999} defaultValue={1} /> Introduce the availability
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
                    $<InputNumber min={0} max={999} defaultValue={0} /> Introduce the price
                </Form.Item>

                <Form.Item
                    name="startDate"
                    label="Initial Date"
                    rules={[{ required: true, message: "Introduce the initial date" }]}
                >
                    <DatePicker defaultValue={dayjs('2023/01/01', dateFormat)} format={dateFormat} /> Introduce the initial date
                </Form.Item>

                <Form.Item
                    name="endDate"
                    label="Final Date"
                    rules={[{ required: true, message: "Introduce the final date" }]}
                >
                    <DatePicker defaultValue={dayjs('2023/01/01', dateFormat)} format={dateFormat} /> Introduce the final date
                </Form.Item>

                <UploadImage setImage={setImage} image={image} />
            </Form>
        </Modal>
    );
}

export default FlightOfferForm;