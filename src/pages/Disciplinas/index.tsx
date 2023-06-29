import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import React, { useState, useEffect } from "react";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import {
  insertDisciplina,
  getDisciplina,
  getProfessor,
  getCurso,
} from "../../api/api";
import Select from "react-select";
import { Subject } from "../../types/types";
import { toast } from "react-toastify";
import { stat } from "fs";

function Disciplinas() {
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState<Subject>({
    nome: "",
    professor_id: "",
    curso_id: "",
    periodo: 1,
    qtaulas: 1,
  });

  const [discplina, setDiscplina] = useState([]);
  const [professors, setProfessors] = useState<object[]>([]);
  const [courses, setCourses] = useState<object[]>([]);

  const validationSubject = (data: Subject): boolean => {
    const { nome, professor_id, curso_id, periodo, qtaulas } = data;

    if (!nome || !professor_id || !curso_id || !periodo || !qtaulas) {
      return false;
    }

    return true;
  };

  const insertNewDisciplina = async (data: Subject) => {
    const status = await insertDisciplina(data);
    if (status === 200) {
      toast.success(`${info.nome} adicionado com sucesso!`);
    } else {
      toast.error(`Erro ao adicionar ${info.nome}!`);
    }
    setModal(!modal);
  };

  const loadProfessor = async () => {
    const response = await getProfessor();
    const newProfessors: object[] = [
      { value: "none", label: "selecione um professor", disabled: true },
    ];
    response.map((professor: any) => {
      newProfessors.push({ value: professor.id, label: professor.nome });
    });
    setProfessors(newProfessors);
  };
  const loadCourse = async () => {
    const response = await getCurso();
    const newCourse: object[] = [
      { value: "none", label: "Selecione um curso", disabled: true },
    ];

    response.map((course: any) => {
      newCourse.push({ value: course.id, label: course.nome });
    });

    setCourses(newCourse);
  };

  useEffect(() => {
    const loadDiscplina = async () => {
      const response = await getDisciplina();
      setDiscplina(response);
    };

    loadDiscplina();
    loadProfessor();
    loadCourse();
  }, [discplina]);

  const dados = [
    {
      component: (
        <InputGroup>
          <InputGroupText>Disciplina</InputGroupText>
          <Input
            type="text"
            onChange={(e) =>
              setInfo((prevState) => ({
                ...prevState,
                nome: e.target.value,
              }))
            }
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
            defaultValue={professors[0]}
            isClearable={true}
            isSearchable={true}
            name="teacher"
            options={professors}
            isOptionDisabled={(option: any) => option.disabled}
            onChange={(e: any) => {
              setInfo((prevState) => ({ ...prevState, professor_id: e.value }));
            }}
          />
        </InputGroup>
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
              setInfo((prevState) => ({ ...prevState, curso_id: e.value }));
            }}
          />
        </InputGroup>
      ),
    },
    {
      component: (
        <div className="d-flex gap-3">
          <InputGroup className="w-50">
            <InputGroupText>Período</InputGroupText>
            <Input
              type="select"
              defaultValue="1°"
              onChange={(e) =>
                setInfo((prevState) => ({
                  ...prevState,
                  periodo: parseInt(e.target.value),
                }))
              }
            >
              <option value="1°">1°</option>
              <option value="2°">2°</option>
              <option value="3°">3°</option>
              <option value="4°">4°</option>
              <option value="5°">5°</option>
              <option value="6°">6°</option>
              <option value="7°">7°</option>
              <option value="8°">8°</option>
              <option value="9°">9°</option>
              <option value="10°">10°</option>
            </Input>
          </InputGroup>
          <InputGroup className="w-50">
            <InputGroupText>Qtd.Aulas</InputGroupText>
            <Input
              type="select"
              defaultValue="1"
              onChange={(e) =>
                setInfo((prevState) => ({
                  ...prevState,
                  qtaulas: parseInt(e.target.value),
                }))
              }
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </Input>
          </InputGroup>
        </div>
      ),
    },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validationSubject(info)) {
      insertNewDisciplina(info);
    } else {
      toast.warn("Inválido, preencha os campos!");
    }
  };

  const columns = [
    {
      dataField: "nome",
      text: "Nome",
      sort: true,
      filter: textFilter({
        className: "filter-table",
        style: {
          width: "90%",
        },
      }),
      headerClasses: "column-with-filter",
      style: {
        width: "40%",
      },
    },
    {
      dataField: "course",
      text: "Curso",
      sort: true,
      style: {
        width: "20%",
      },
    },
    {
      dataField: "periodo",
      text: "Periodo",
      sort: true,
      style: {
        width: "10%",
      },
    },
    {
      dataField: "qtaulas",
      text: "Qnt. Aulas",
      sort: true,
      style: {
        width: "10%",
      },
    },
    {
      dataField: "teacher",
      text: "Professor",
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
        Adicionar disciplina
      </Button>
      <TableWithSearch
        data={discplina.map((unicaDisciplina) => ({
          nome: unicaDisciplina["nome"],
          course: unicaDisciplina["curso"]["nome"],
          periodo: unicaDisciplina["periodo"],
          qtaulas: unicaDisciplina["qtaulas"],
          teacher: unicaDisciplina["professor"]["nome"],
        }))}
        columns={columns}
      />

      <InsertModal
        open={modal}
        close={() => setModal(!modal)}
        name={"Disciplina"}
        dados={dados}
        submit={handleSubmit}
      />
    </div>
  );
}

export default Disciplinas;
