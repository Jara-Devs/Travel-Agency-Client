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
    category: number;
    duration: number;
    origin: TouristPlace;
    destination: TouristPlace;

}

export interface FlightFormProps {
    onOk: (form: FlightFormType) => void;
    onCancel: () => void;
    values?: FlightFormData;
    open: boolean;
}

const TouristActivityForm: FC<FlightFormProps> = ({ onOk, onCancel, values, open }) => {

    const [form] = Form.useForm<FlightFormData>();

    useEffect(() => {
        if (open) form.resetFields();
        if (values) {
            form.setFieldsValue({ ...values });
        };

    }, [open, form, values]);



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
                            category: values.category,
                            originId: values.origin,
                            destinationId: values.destination,
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
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: "Select the description" }]}
                >
                    <Input placeholder="Introduce the description" />
                    
                </Form.Item>

                
                <UploadImage setImage={setImage} image={image} />



            </Form>
        </Modal>
    );
};

export default TouristActivityForm;
