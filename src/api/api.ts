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

export const editProfessor = async (data: object, id:string) => {
  try {
    const { status } = await api.put(`/teacher/${id}`, data);
    return status;
  } catch (error) {
    console.error("Error while editing professor: ", error);
  }
};

export const deleteProfessor = async (id:string) => {
  try {
    const { status } = await api.delete(`/teacher/${id}`);
    return status;
  } catch (error) {
    console.error("Error while delete professor: ", error);
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

export const editCurso = async (data: object, id:string) => {
  try {
    const { status } = await api.put(`/course/${id}`, data);
    return status;
  } catch (error) {
    console.error("Error while editing curso: ", error);
  }
};

export const deleteCurso = async (id:string) => {
  try {
    const { status } = await api.delete(`/course/${id}`);
    return status;
  } catch (error) {
    console.error("Error while delete curso: ", error);
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

export const editDisciplina = async (data: object, id:string) => {
  try {
    const { status } = await api.put(`/discipline/${id}`, data);
    return status;
  } catch (error) {
    console.error("Error while editing Disciplina: ", error);
  }
};

export const deleteDisciplina = async (id:string) => {
  try {
    const { status } = await api.delete(`/discipline/${id}`);
    return status;
  } catch (error) {
    console.error("Error while delete Disciplina: ", error);
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

export const editTurma = async (data: object, id:string) => {
  try {
    const { status } = await api.put(`/class/${id}`, data);
    return status;
  } catch (error) {
    console.error("Error while editing Turma: ", error);
  }
};

export const deleteTurma = async (id:string) => {
  try {
    const { status } = await api.delete(`/class/${id}`);
    return status;
  } catch (error) {
    console.error("Error while delete Turma: ", error);
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

export const editRestricao = async (data: object, id:string) => {
  try {
    const { status } = await api.put(`/restriction/${id}`, data);
    return status;
  } catch (error) {
    console.error("Error while editing Restrição: ", error);
  }
};

export const deleteRestricao = async (id:string) => {
  try {
    const { status } = await api.delete(`/restriction/${id}`);
    return status;
  } catch (error) {
    console.error("Error while delete Restrição: ", error);
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

export const editSala = async (data: object, id:string) => {
  try {
    const { status } = await api.put(`/room/${id}`, data);
    return status;
  } catch (error) {
    console.error("Error while editing Sala: ", error);
  }
};

export const deleteSala = async (id:string) => {
  try {
    const { status } = await api.delete(`/room/${id}`);
    return status;
  } catch (error) {
    console.error("Error while delete Sala: ", error);
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

export const editAula = async (data: object, id:string) => {
  try {
    const { status } = await api.put(`/classroom/${id}`, data);
    return status;
  } catch (error) {
    console.error("Error while editing Aula: ", error);
  }
};

export const deleteAula = async (id:string) => {
  try {
    const { status } = await api.delete(`/classroom/${id}`);
    return status;
  } catch (error) {
    console.error("Error while delete Aula: ", error);
  }
};

