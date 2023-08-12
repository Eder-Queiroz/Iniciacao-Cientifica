import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import { useState, useEffect } from "react";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import {
  insertAula,
  getAula,
  getCurso,
  getProfessor,
  getDisciplina,
  getSala,
  getTurma,
} from "../../api/api";
import Select from "react-select";
import { Classroom } from "../../types/types";
import { toast } from "react-toastify";

function Aulas() {
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState<Classroom>({
    amount: 0,
    duration: 0,
    teacher_id: "",
    discipline_id: "",
    room_id: "",
    course_id: "",
    class_id: "",
  });

  const [aula, setAula] = useState([]);
  const [courses, setCourses] = useState<object[]>([]);
  const [classes, setClasses] = useState<object[]>([]);
  const [teachers, setTeachers] = useState<object[]>([]);
  const [disciplines, setDisciplines] = useState<object[]>([]);
  const [rooms, setRooms] = useState<object[]>([]);

  const validationClassroom = (data: Classroom): boolean => {
    const {
      amount,
      duration,
      teacher_id,
      discipline_id,
      room_id,
      course_id,
      class_id,
    } = data;

    if (
      !amount ||
      !duration ||
      !teacher_id ||
      !discipline_id ||
      !room_id ||
      !course_id ||
      !class_id
    ) {
      return false;
    }

    return true;
  };

  const insertNewAula = async (data: Classroom) => {
    const status = await insertAula(data);
    console.log(status);
    if (status == 200) {
      toast.success("Aula adicionada com sucesso!");
    } else {
      toast.error("Erro ao adicionar Aula!");
    }
    setModal(!modal);
  };

  const loadCourse = async () => {
    const response = await getCurso();
    const newCourse: object[] = [
      { value: "none", label: "Selecione um curso", disabled: true },
    ];

    response.map((course: any) => {
      newCourse.push({ value: course.id, label: course.name });
    });

    setCourses(newCourse);
  };

  const loadClass = async () => {
    const response = await getTurma();
    const newClas: object[] = [
      { value: "none", label: "Selecione uma Turma", disabled: true },
    ];

    response.map((clas: any) => {
      newClas.push({ value: clas.id, label: clas.name });
    });

    setClasses(newClas);
  };

  const loadTeacher = async () => {
    const response = await getProfessor();
    const newTeacher: object[] = [
      { value: "none", label: "Selecione um Professor", disabled: true },
    ];

    response.map((teacher: any) => {
      newTeacher.push({ value: teacher.id, label: teacher.name });
    });

    setTeachers(newTeacher);
  };

  const loadDiscipline = async () => {
    const response = await getDisciplina();
    const newDiscipline: object[] = [
      { value: "none", label: "Selecione uma Diciplina", disabled: true },
    ];

    response.map((discipline: any) => {
      newDiscipline.push({ value: discipline.id, label: discipline.name });
    });

    setDisciplines(newDiscipline);
  };

  const loadRoom = async () => {
    const response = await getSala();
    const newRoom: object[] = [
      { value: "none", label: "Selecione uma Sala", disabled: true },
    ];

    response.map((room: any) => {
      newRoom.push({ value: room.id, label: room.name });
    });

    setRooms(newRoom);
  };

  useEffect(() => {
    const loadAula = async () => {
      const response = await getAula();
      setAula(response);
    };

    loadAula();
    loadCourse();
    loadClass();
    loadTeacher();
    loadDiscipline();
  }, [aula]);

  const dados = [
    {
      component: (
        <div className="d-flex gap-3">
          <InputGroup className="w-50">
            <InputGroupText>Quantidade</InputGroupText>
            <Input
              type="text"
              onChange={(e) =>
                setInfo((prevState) => ({ ...prevState, amount: parseInt(e.target.value) }))
              }
            />
          </InputGroup>
          <InputGroup className="w-50">
            <InputGroupText>Duração</InputGroupText>
            <Input
              type="text"
              onChange={(e) =>
                setInfo((prevState) => ({ ...prevState, duration: parseInt(e.target.value) }))
              }
            />
          </InputGroup>
        </div>
      ),
    },
    {
      component: (
        <InputGroup>
          <InputGroupText>Curso</InputGroupText>
          <Select
            className="basic-single form-control border-select"
            classNamePrefix="select"
            defaultValue={courses[0]}
            isClearable={true}
            isSearchable={true}
            name="course"
            options={courses}
            isOptionDisabled={(option: any) => option.disabled}
            onChange={(e: any) => {
              setInfo((prevState) => ({ ...prevState, course_id: e.value }));
            }}
          />
        </InputGroup>
      ),
    },
    {
      component: (
        <InputGroup>
          <InputGroupText>Turma</InputGroupText>
          <Select
            className="basic-single form-control border-select"
            classNamePrefix="select"
            defaultValue={classes[0]}
            isClearable={true}
            isSearchable={true}
            name="classes"
            options={classes}
            isOptionDisabled={(option: any) => option.disabled}
            onChange={(e: any) => {
              setInfo((prevState) => ({ ...prevState, class_id: e.value }));
            }}
          />
        </InputGroup>
      ),
    },
    {
      component: (
        <InputGroup>
          <InputGroupText>Professor</InputGroupText>
          <Select
            className="basic-single form-control border-select"
            classNamePrefix="select"
            defaultValue={teachers[0]}
            isClearable={true}
            isSearchable={true}
            name="teachers"
            options={teachers}
            isOptionDisabled={(option: any) => option.disabled}
            onChange={(e: any) => {
              setInfo((prevState) => ({ ...prevState, teacher_id: e.value }));
            }}
          />
        </InputGroup>
      ),
    },
    {
      component: (
        <InputGroup>
          <InputGroupText>Disciplina</InputGroupText>
          <Select
            className="basic-single form-control border-select"
            classNamePrefix="select"
            defaultValue={disciplines[0]}
            isClearable={true}
            isSearchable={true}
            name="disciplines"
            options={disciplines}
            isOptionDisabled={(option: any) => option.disabled}
            onChange={(e: any) => {
              setInfo((prevState) => ({ ...prevState, discipline_id: e.value }));
            }}
          />
        </InputGroup>
      ),
    },
    {
      component: (
        <InputGroup>
          <InputGroupText>Sala</InputGroupText>
          <Select
            className="basic-single form-control border-select"
            classNamePrefix="select"
            defaultValue={rooms[0]}
            isClearable={true}
            isSearchable={true}
            name="rooms"
            options={rooms}
            isOptionDisabled={(option: any) => option.disabled}
            onChange={(e: any) => {
              setInfo((prevState) => ({ ...prevState, room_id: e.value }));
            }}
          />
        </InputGroup>
      ),
    },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validationClassroom(info)) {
      insertNewAula(info);
    } else {
      toast.warn("Inválido, preencha os campos!");
    }
  };

  const columns = [
    {
      dataField: "amount",
      text: "Quantidade de Aulas",
      sort: true,
      filter: textFilter({
        className: "filter-table",
      }),
      headerClassrooms: "column-with-filter",
      style: {
        width: "20%",
      },
    },
    {
      dataField: "duration",
      text: "Duração",
      sort: true,
      style: {
        width: "20%",
      },
    },
    {
      dataField: "course_id",
      text: "Curso",
      sort: true,
      style: {
        width: "20%",
      },
    },
    {
      dataField: "teacher_id",
      text: "Professor",
      sort: true,
      style: {
        width: "20%",
      },
    },
    {
      dataField: "discpline_id",
      text: "Disciplina",
      sort: true,
      style: {
        width: "20%",
      },
    },
    {
      dataField: "room_id",
      text: "Salas",
      sort: true,
      style: {
        width: "20%",
      },
    },
  ];

  return (
    <div className="p-4 d-flex gap-3 flex-column">
      <Button
        onClick={() => setModal(true)}
        color="primary"
        outline
        style={{ maxWidth: "20%" }}
      >
        Adicionar aula
      </Button>
      <TableWithSearch data={aula} columns={columns} />

      <InsertModal
        open={modal}
        close={() => setModal(!modal)}
        name={"Aulas"}
        dados={dados}
        submit={handleSubmit}
      />
    </div>
  );
}

export default Aulas;
