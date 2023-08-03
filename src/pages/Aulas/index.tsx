import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import { useState, useEffect } from "react";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import { insertTurma, getTurma, getCurso } from "../../api/api";
import Select from "react-select";
import { Classe } from "../../types/types";
import { toast } from "react-toastify";

function Aulas() {
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState<Classe>({
    name: "",
    curso_id: "",
    periodo: 1,
    qtalunos: 0,
  });

  const [turma, setTurma] = useState([]);
  const [courses, setCourses] = useState<object[]>([]);

  const validationClasse = (data: Classe): boolean => {
    const { curso_id, periodo, qtalunos, name } = data;

    if (!curso_id || !periodo || !qtalunos || !name) {
      return false;
    }

    return true;
  };

  const insertNewTurma = async (data: Classe) => {
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
      newCourse.push({ value: course.id, label: course.nome });
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
              defaultValue="1º"
              onChange={(e) =>
                setInfo((prevState) => ({
                  ...prevState,
                  periodo: parseInt(e.target.value),
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
                  qtalunos: parseInt(e.target.value),
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
    if (validationClasse(info)) {
      insertNewTurma(info);
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
      }),
      headerClasses: "column-with-filter",
      style: {
        width: "50%",
      },
    },
    {
      dataField: "curso",
      text: "Curso",
      sort: true,
      style: {
        width: "15%",
      },
    },
    {
      dataField: "periodo",
      text: "Período",
      sort: true,
      style: {
        width: "15%",
      },
    },
    {
      dataField: "qtalunos",
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
        Adicionar aula
      </Button>
      <TableWithSearch
        data={turma.map((unicaTurma) => ({
          curso: unicaTurma["curso"]["nome"],
          periodo: unicaTurma["periodo"],
          qtalunos: unicaTurma["qtalunos"],
        }))}
        columns={columns}
      />

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
