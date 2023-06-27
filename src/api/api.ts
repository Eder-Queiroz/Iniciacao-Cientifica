import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getProfessor = async () => {
  try {
    const { data } = await api.get("/professor");
    return data;
  } catch (error) {
    console.error("Error while getting professor: ", error);
  }
};

export const insertProfessor = async (data: object) => {
  try {
    const { status } = await api.post("/professor", data);
    return status;
  } catch (error) {
    console.error("Error while inserting professor: ", error);
  }
};

export const getCurso = async () => {
  try {
    const { data } = await api.get("/curso");
    return data;
  } catch (error) {
    console.error("Error while getting curso: ", error);
  }
};

export const insertCurso = async (data: object) => {
  try {
    const { status } = await api.post("/curso", data);
    return status;
  } catch (error) {
    console.error("Error while insertinng curso: ", error);
  }
};

export const getDisciplina = async () => {
  try {
    const { data } = await api.get("/disciplina");
    return data;
  } catch (error) {
    console.error("Error while getting Disciplina: ", error);
  }
};

export const insertDisciplina = async (data: object) => {
  try {
    const { status } = await api.post("/disciplina", data);
    return status;
  } catch (error) {
    console.error("Error while insertinng Disciplina: ", error);
  }
};

export const getTurma = async () => {
  try {
    const { data } = await api.get("/turma");
    return data;
  } catch (error) {
    console.error("Error while getting Turma: ", error);
  }
};

export const insertTurma = async (data: object) => {
  try {
    const { status } = await api.post("/turma", data);
    return status;
  } catch (error) {
    console.error("Error while insertinng Turma: ", error);
  }
};

export const getRestricao = async () => {
  try {
    const { data } = await api.get("/restricao");
    return data;
  } catch (error) {
    console.error("Error while getting Restrição: ", error);
  }
};

export const insertRestricao = async (data: object) => {
  try {
    const { status } = await api.post("/restricao", data);
    return status;
  } catch (error) {
    console.error("Error while insertinng Restrição: ", error);
  }
};

export const getSala = async () => {
  try {
    const { data } = await api.get("/sala");
    return data;
  } catch (error) {
    console.error("Error while getting sala: ", error);
  }
};

export const insertSala = async (data: object) => {
  try {
    const { status } = await api.post("/sala", data);
    return status;
  } catch (error) {
    console.error("Error while inserting sala: ", error);
  }
};
