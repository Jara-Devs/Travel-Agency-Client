import { FC, useEffect, useState } from "react";
import {AgencyUserFormType} from "../../types/services";
import { Form, Input, Modal, Select, Typography, message } from "antd";
import Title from "antd/es/typography/Title";
import { buildMessage } from "../../common/functions";

export interface AgencyUserFormData {
    name: string;
    email: string;
    password: string;
    role: string;
    agencyId: number;
}

export interface AgencyUserFormProps {
    onOk: (form: AgencyUserFormType) => void;
    onCancel: () => void;
    values?: AgencyUserFormData;
    create: boolean;
    open: boolean;
  }