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

export const getCurso = async () => {
    
    try{
        const {data} = await api.get('/courses');
        return data;
    }catch(error){
        console.error("Error while getting curso: ", error);
    }
}

export const insertCurso = async (data:object) => {
    
    try{
        const {status} = await api.post('/courses', data);
        return status;
    }catch(error){
        console.error("Error while insertinng curso: ", error);
    }
}

export const getDisciplina = async () => {
    
    try{
        const {data} = await api.get('/subjects');
        return data;
    }catch(error){
        console.error("Error while getting Disciplina: ", error);
    }
}

export const insertDisciplina = async (data:object) => {
    
    try{
        const {status} = await api.post('/subjects', data);
        return status;
    }catch(error){
        console.error("Error while insertinng Disciplina: ", error);
    }
}

export const getTurma = async () => {
    
    try{
        const {data} = await api.get('/classes');
        return data;
    }catch(error){
        console.error("Error while getting Turma: ", error);
    }
}

export const insertTurma = async (data:object) => {
    
    try{
        const {status} = await api.post('/classes', data);
        return status;
    }catch(error){
        console.error("Error while insertinng Turma: ", error);
    }
}

export const getRestricao = async () => {
    
    try{
        const {data} = await api.get('/restrictions');
        return data;
    }catch(error){
        console.error("Error while getting Restrição: ", error);
    }
}

export const insertRestricao = async (data:object) => {
    
    try{
        const {status} = await api.post('/restrictions', data);
        return status;
    }catch(error){
        console.error("Error while insertinng Restrição: ", error);
    }
}

export const getSala = async () => {

    try{
        const {data} = await api.get('/sala');
        return data;
    }catch(error) {
        console.error("Error while getting sala: ", error);
    }

}

export const insertSala = async (data:object) => {

    try {
        const {status} = await api.post('/sala', data);
        return status;
    }catch(error) {
        console.error("Error while inserting sala: ", error);
    }

}