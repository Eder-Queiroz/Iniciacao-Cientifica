import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import { useState, useEffect } from "react";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import { insertTurma, getTurma, getCurso } from "../../api/api";
import Select from "react-select";

function Turmas() {
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState({
    course: "EC",
    period: "1",
    numberStudents: "",
  });

  const [turma, setTurma] = useState([]);
  const [courses, setCourses] = useState<object[]>([]);
  const [status, setStatus] = useState({});

  const insertNewTurma = async (data: object) => {
    const status = await insertTurma(data);
    setStatus({ status: status });
  };

  const loadCourse = async () => {
    const response = await getCurso();
    const newCourse: object[] = [];

    response.map((course: any) => {
      newCourse.push({ value: course.name, label: course.name });
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
  }, []);

  const dados = [
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
              defaultValue="1"
              onChange={(e) =>
                setInfo((prevState) => ({
                  ...prevState,
                  period: e.target.value,
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
                  numberStudents: e.target.value,
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
    insertNewTurma(info);
    window.location.reload();
  };

  const columns = [
    {
      dataField: "course",
      text: "Curso",
      sort: true,
      filter: textFilter({
        className: "filter-table",
      }),
      headerClasses: "column-with-filter",
      style: {
        width: "60%",
      },
    },
    {
      dataField: "period",
      text: "Período",
      sort: true,
      style: {
        width: "20%",
      },
    },
    {
      dataField: "number_students",
      text: "Quantidade de Alunos",
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
