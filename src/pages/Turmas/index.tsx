import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import { useState, useEffect } from "react";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import { insertTurma, getTurma, getCurso } from "../../api/api";
import Select from "react-select";
import { Class } from "../../types/types";
import { toast } from "react-toastify";

function Turmas() {
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState<Class>({
    name: "",
    course_id: "",
    period: 1,
    num_students: 0,
  });

  const [turma, setTurma] = useState([]);
  const [courses, setCourses] = useState<object[]>([]);

  const validationClass = (data: Class): boolean => {
    const { course_id, period, num_students, name } = data;

    if (!course_id || !period || !num_students || !name) {
      return false;
    }

    return true;
  };

  const insertNewTurma = async (data: Class) => {
    const status = await insertTurma(data);
    if (status == 200) {
      toast.success("Turma adicionada com sucesso!");
    } else {
      toast.error("Erro ao adicionar Turma!");
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

  useEffect(() => {
    const loadTurma = async () => {
      const response = await getTurma();
      setTurma(response);
    };

    loadTurma();
    loadCourse();
  }, [turma]);

  const dados = [
    {
      component: (
        <InputGroup>
          <InputGroupText>Nome</InputGroupText>
          <Input
            type="text"
            onChange={(e) =>
              setInfo((prevState) => ({ ...prevState, name: e.target.value }))
            }
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
              setInfo((prevState) => ({ ...prevState, course_id: e.value }));
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
              defaultValue="1º"
              onChange={(e) =>
                setInfo((prevState) => ({
                  ...prevState,
                  period: parseInt(e.target.value),
                }))
              }
            >
              <option value="1">1°</option>
              <option value="2">2°</option>
              <option value="3">3°</option>
              <option value="4">4°</option>
              <option value="5">5°</option>
              <option value="6">6°</option>
              <option value="7">7°</option>
              <option value="8">8°</option>
              <option value="9">9°</option>
              <option value="10">10°</option>
            </Input>
          </InputGroup>
          <InputGroup className="w-50">
            <InputGroupText>Qdt.Alunos</InputGroupText>
            <Input
              type="text"
              onChange={(e) =>
                setInfo((prevState) => ({
                  ...prevState,
                  num_students: parseInt(e.target.value),
                }))
              }
            />
          </InputGroup>
        </div>
      ),
    },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validationClass(info)) {
      insertNewTurma(info);
    } else {
      toast.warn("Inválido, preencha os campos!");
    }
  };

  const columns = [
    {
      dataField: "name",
      text: "Nome",
      sort: true,
      filter: textFilter({
        className: "filter-table",
      }),
      headerClasss: "column-with-filter",
      style: {
        width: "50%",
      },
    },
    {
      dataField: "course_id",
      text: "Curso",
      sort: true,
      style: {
        width: "15%",
      },
    },
    {
      dataField: "period",
      text: "Período",
      sort: true,
      style: {
        width: "15%",
      },
    },
    {
      dataField: "num_students",
      text: "Quantidade de Alunos",
      sort: true,
      style: {
        width: "15%",
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
        Adicionar turma
      </Button>
      <TableWithSearch data={turma} columns={columns} />

      <InsertModal
        open={modal}
        close={() => setModal(!modal)}
        name={"Turma"}
        dados={dados}
        submit={handleSubmit}
      />
    </div>
  );
}

export default Turmas;
