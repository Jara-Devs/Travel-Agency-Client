import { Flight, FlightOfferFacility, FlightOfferFormType } from "../../types/services";
import { FC, useState, useEffect } from "react";
import { Form, Input, InputNumber, DatePicker, Modal, Select, Typography, message } from "antd";
import { flight } from "../../api/services";
import { ApiResponse, Image } from "../../types/api";
import Title from "antd/es/typography/Title";
import UploadImage from "../../common/UploadImage";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { SelectProps } from 'antd';

dayjs.extend(customParseFormat);

export interface FlightOfferFormData {
    name: string;
    flightId: number;
    availability: number;
    description: string;
    price: number;
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
    facilities: number[];
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

    const dateFormat = 'YYYY/MM/DD';

    const options: SelectProps['options'] = [];

    options.push({
        label: "Fist Class",
        value: 0,
    });

    options.push({
        label: "Principal dish",
        value: 1,
    });

    options.push({
        label: "Snack",
        value: 2,
    });

    options.push({
        label: "Audiovisual Contend",
        value: 3,
    });

    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };

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
                        startDate: values.startDate.valueOf(),
                        endDate: values.endDate.valueOf(),
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

                <Form.Item
                    name="facilities"
                    label="Facilities"
                    rules={[{ required: true, message: "Select the facilities" }]}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        options={
                            [FlightOfferFacility.FirstClass, FlightOfferFacility.PrincipalDish, FlightOfferFacility.Snack, FlightOfferFacility.AudiovisualContend,].map(
                                (x) => ({
                                    value: x,
                                    label: x,
                                    key: x,
                                })
                            )}
                        placeholder="Select the facilities"
                    />
                </Form.Item>

                <UploadImage setImage={setImage} image={image} />
            </Form>
        </Modal>
    );
}

export default FlightOfferForm;