import { FC, useEffect, useState } from 'react';
import {  HotelFormType, TouristPlace } from '../../types/services';
import { Form, Input, Modal, Typography, message, Select } from 'antd';
import Title from "antd/es/typography/Title";
import { touristPlace } from '../../api/services';
import { ApiResponse } from '../../types/api';

export interface HotelFormData {
    name: string;
    category: number;
    touristPlaceId: number;
}

export interface HotelFormProps {
    onOk: (form: HotelFormType) => void;
    onCancel: () => void;
    values?: HotelFormData;
    open: boolean;
}

const HotelForm: FC<HotelFormProps> = ({ onOk, onCancel, values, open }) => {
    const [place, setPlace] = useState<TouristPlace[]>([]);

    const [form] = Form.useForm<HotelFormData>();

    useEffect(() => {
        if (open) form.resetFields();
        if (values) form.setFieldsValue({ ...values });
    }, [open, form, values]);


    const load = async () => {
        const responsePlace = await touristPlace().get({ select: ["id", "name"] });



        if (responsePlace.ok) {
            setPlace(responsePlace.value!);

        } else {
            let msg = "";

            const aux = (response: ApiResponse<any>) => {
                if (!responsePlace.ok) {
                    if (msg.length === 0) msg = response.message;
                    else msg = `${message}, ${response.message}`;
                }
            };

            aux(responsePlace);

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
                onFinish={(values: HotelFormData) => {
                    onOk({
                        name: values.name,
                        category: values.category,
                        touristPlaceId: values.touristPlaceId,
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
                    name="category"
                    label="Category"
                    rules={[{ required: true, message: "Select the category" }]}
                >
                    <Select
                        allowClear
                        filterOption={(input, option) => option?.label === input}
                        options={[1,2,3,4,5].map((x) => ({
                            value: x,
                            label:  `${x} stars`,
                            key: x,
                        }))}
                        placeholder="Select the category"
                    />
                </Form.Item>

                <Form.Item
                    name="touristPlaceId"
                    label="Place"
                    rules={[{ required: true, message: "Select the place" }]}
                >
                    <Select
                        allowClear
                        filterOption={(input, option) => option?.label === input}
                        options={place.map((x) => ({
                            value: x.id,
                            label: x.name,
                            key: x.id,
                        }))}
                        placeholder="Select the place"
                    />
                </Form.Item>

                
            </Form>
        </Modal>
    );
};

export default HotelForm;
