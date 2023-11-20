import { FC, useEffect, useState } from 'react';
import { HotelFormType, TouristPlace, TouristActivity, TouristActivityFormType, FlightFormType } from '../../types/services';
import { Form, Input, Modal, Typography, message, Select } from 'antd';
import Title from "antd/es/typography/Title";
import { touristPlace } from '../../api/services';
import { ApiResponse } from '../../types/api';
import { Image } from "../../types/api";
import UploadImage from '../../common/UploadImage';


export interface FlightFormData {
    company: string;
    flightcategory: number;
    duration: number;
    originId: number;
    destinationId: number;

}

export interface FlightFormProps {
    onOk: (form: FlightFormType) => void;
    onCancel: () => void;
    values?: FlightFormData;
    open: boolean;
}

const FlightForm: FC<FlightFormProps> = ({ onOk, onCancel, values, open }) => {
    const [place, setPlace] = useState<TouristPlace[]>([]);

    const [form] = Form.useForm<FlightFormData>();

    useEffect(() => {
        if (open) form.resetFields();
        if (values) {
            form.setFieldsValue({ ...values });
        };

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
    const flightcategories = ['One star', 'Two stars', 'Three stars', 'Four stars', 'Five stars'];



    return (
        <Modal
            open={open}
            title={
                <Typography>
                    <Title level={3}>Create Tourist Activity</Title>
                </Typography>
            }
            onOk={form.submit}
            onCancel={onCancel}
        >
            <Form
                layout="vertical"
                style={{ marginTop: "20px" }}
                form={form}
                onFinish={(values: FlightFormData) => {
                        onOk({
                            company: values.company,
                            flightcategory: values.flightcategory,
                            originId: values.originId,
                            destinationId: values.destinationId,
                            duration: values.duration


                        });

                    

                }}
            >
                <Form.Item
                    name="company"
                    label="Company"
                    rules={[{ required: true, message: "Introduce the company" }]}
                >
                    <Input placeholder="Introduce the company" />
                </Form.Item>

                <Form.Item
                    name="duration"
                    label="Duration"
                    rules={[{ required: true, message: "Introduce the duration" }]}
                >
                    <Input placeholder="Introduce the duration" />
                    
                </Form.Item>

                <Form.Item
                    name="flightcategory"
                    label="Category"
                    rules={[{ required: true, message: "Select the category" }]}
                >
                    <Select
                        allowClear
                        filterOption={(input, option) => option?.label === input}
                        options={flightcategories.map((x) => ({
                            value: (flightcategories.indexOf(x) + 1),
                            label: x,
                            key: x,
                        }))}
                        placeholder="Select the category"
                    />
                </Form.Item>

                <Form.Item
                    name="originId"
                    label="Origin"
                    rules={[{ required: true, message: "Select the origin" }]}
                >
                    <Select
                        allowClear
                        filterOption={(input, option) => option?.label === input}
                        options={place.map((x) => ({
                            value: x.id,
                            label: x.name,
                            key: x.id,
                        }))}
                        placeholder="Select the origin"
                    />
                </Form.Item>

                <Form.Item
                    name="destinationId"
                    label="Destination"
                    rules={[{ required: true, message: "Select the destination" }]}
                >
                    <Select
                        allowClear
                        filterOption={(input, option) => option?.label === input}
                        options={place.map((x) => ({
                            value: x.id,
                            label: x.name,
                            key: x.id,
                        }))}
                        placeholder="Select the destination"
                    />
                </Form.Item>

                



            </Form>
        </Modal>
    );
};

export default FlightForm;
