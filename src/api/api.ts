import axios from "axios";
import { stat } from "fs";

const api = axios.create({
    baseURL: "http://127.0.0.1:5000"
});

export const getProfessor = async () => {

    try{
        const {data} = await api.get('/professors');
        return data;

    }catch(error) {
        console.error("Error while getting professor: ", error);
    }

}

export const insertProfessor = async (data:object) => {

    try {

        const {status} = await api.post('/professors', data);
        return status;
    }catch(error) {

        console.error("Error while inserting professor: ", error);

    }

}