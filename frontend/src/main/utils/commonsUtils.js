import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'

export function onDeleteSuccess(message) {
    console.log(message);
    toast(message);
}

export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/commons",
        method: "DELETE",
        params: {
            id: cell.row.values.id
        }
    }
}