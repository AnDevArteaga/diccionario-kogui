import axios from "axios";
import { EditInfo, NewInfo } from "@/interfaces/info.interface";

export async function getInfo() {
    try {
        const response = await axios.get(
            "https://edutlasdeveloper.pythonanywhere.com/api/info",
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function addInfo(info: NewInfo) {
    if (!info.imagen) {
        console.log("no imagen");
        return;
    }
    const formData = new FormData();
    formData.append("informacion", info.info);
    formData.append("significado", info.significado);
    formData.append("imagen", info.imagen);

    try {
        console.log("formData", formData);
        console.log("info", info);
        const response = await axios.post(
            "https://edutlasdeveloper.pythonanywhere.com/api/guardarinfo",
            formData,
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function editInfo(info: EditInfo) {
    if (!info.imagen) {
        console.log("no imagen");
        return;
    }

    const formData = new FormData();
    formData.append("informacion", info.info);
    formData.append("significado", info.significado);
    formData.append("imagen", info.imagen);

    try {
        console.log("info", info);
        const response = await axios.put(
            `https://edutlasdeveloper.pythonanywhere.com/api/info/${info.id}`,
            formData,
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function deleteInfo(id: number) {
    try {
        const response = await axios.delete(
            `https://edutlasdeveloper.pythonanywhere.com/api/info/${id}`,
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}
