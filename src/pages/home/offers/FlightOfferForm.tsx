import { Flight, FlightOfferFormType } from "../../../types/services";
import { FC, useState, useEffect } from "react";
import { Form } from "antd";

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

    const [Flight, setFligth] = useState<Flight[]>([]);
    const [form] = Form.useForm<FlightOfferFormData>();

    useEffect(() => {
        if (open) form.resetFields();
    }, [open, form, values]);
}

export default FlightOfferForm;