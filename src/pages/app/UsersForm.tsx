import { FC, useEffect, useState } from "react";
import {AgencyUserFormType} from "../../types/services";
import { Form, Input, Modal, Select, Typography, message } from "antd";
import Title from "antd/es/typography/Title";
import { buildMessage } from "../../common/functions";