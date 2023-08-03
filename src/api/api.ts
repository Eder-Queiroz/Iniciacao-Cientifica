import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getProfessor = async () => {
  try {
    const { data } = await api.get("/teacher");
    return data;
  } catch (error) {
    console.error("Error while getting professor: ", error);
  }
};

export const insertProfessor = async (data: object) => {
  try {
    const { status } = await api.post("/teacher", data);
    return status;
  } catch (error) {
    console.error("Error while inserting professor: ", error);
  }
};

export const getCurso = async () => {
  try {
    const { data } = await api.get("/course");
    return data;
  } catch (error) {
    console.error("Error while getting curso: ", error);
  }
};

export const insertCurso = async (data: object) => {
  try {
    const { status } = await api.post("/course", data);
    return status;
  } catch (error) {
    console.error("Error while insertinng curso: ", error);
  }
};

export const getDisciplina = async () => {
  try {
    const { data } = await api.get("/discipline");
    return data;
  } catch (error) {
    console.error("Error while getting Disciplina: ", error);
  }
};

export const insertDisciplina = async (data: object) => {
  try {
    const { status } = await api.post("/discipline", data);
    return status;
  } catch (error) {
    console.error("Error while insertinng Disciplina: ", error);
  }
};

export const getTurma = async () => {
  try {
    const { data } = await api.get("/class");
    return data;
  } catch (error) {
    console.error("Error while getting Turma: ", error);
  }
};

export const insertTurma = async (data: object) => {
  try {
    const { status } = await api.post("/class", data);
    return status;
  } catch (error) {
    console.error("Error while insertinng Turma: ", error);
  }
};

export const getRestricao = async () => {
  try {
    const { data } = await api.get("/restriction");
    return data;
  } catch (error) {
    console.error("Error while getting Restrição: ", error);
  }
};

export const insertRestricao = async (data: object) => {
  try {
    const { status } = await api.post("/restriction", data);
    return status;
  } catch (error) {
    console.error("Error while insertinng Restrição: ", error);
  }
};

export const getSala = async () => {
  try {
    const { data } = await api.get("/room");
    return data;
  } catch (error) {
    console.error("Error while getting sala: ", error);
  }
};

export const insertSala = async (data: object) => {
  try {
    const { status } = await api.post("/room", data);
    return status;
  } catch (error) {
    console.error("Error while inserting sala: ", error);
  }
};

export const getAula = async () => {
  try {
    const { data } = await api.get("/classroom");
    return data;
  } catch (error) {
    console.error("Error while getting sala: ", error);
  }
};

export const insertAula = async (data: object) => {
  try {
    const { status } = await api.post("/classroom", data);
    return status;
  } catch (error) {
    console.error("Error while inserting sala: ", error);
  }
};

