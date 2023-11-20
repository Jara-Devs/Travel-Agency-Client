import { FC, useEffect, useState } from "react";
import {UserSystemFormType} from "../../types/auth";
import { Form, Input, Modal, Select, Typography, message } from "antd";
import Title from "antd/es/typography/Title";

export interface UserSystemFormData {
    name: string;
    email: string;
    password: string;
    role: string;
    agencyId: number;
}

export interface UserSystemFormProps {
    onOk: (form: UserSystemFormType) => void;
    onCancel: () => void;
    values?: UserSystemFormData;
    create: boolean;
    open: boolean;
}

const UserForm: any = () => {

}

export default UserForm;
