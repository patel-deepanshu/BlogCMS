import { toast } from "react-toastify";

export const toastError = (er: any) => toast.error(er.response.data.msg);
export const toastSuccess = (msg: string) => toast.success(msg);
export const toastInfo = (msg: string) => toast.info(msg);
