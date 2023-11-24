import { Flight, FlightOfferFormType } from "../../../types/services";
import { FC, useState, useEffect } from "react";
import { Form, message } from "antd";
import { flight } from "../../../api/services";
import { ApiResponse } from "../../../types/api";

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
}

export default FlightOfferForm;