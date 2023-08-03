import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import { useState, useEffect } from "react";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import { insertCurso, getCurso } from "../../api/api";
import { Course } from "../../types/types";
import { toast } from "react-toastify";

export default function Cursos() {
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState<Course>({
    nome: "",
    turno: "matutino",
  });

  const [curso, setCurso] = useState([]);

  const validationCourse = (data: Course): boolean => {
    const { nome, turno } = data;

    if (!nome || !turno) {
      return false;
    }

    return true;
  };

  const insertNewCurso = async (data: Course) => {
    const status = await insertCurso(data);
    if (status === 200) {
      toast.success(`${info.nome} adicionado com sucesso!`);
    } else {
      toast.error(`Erro ao adicionar ${info.nome}!`);
    }
    setModal(!modal);
  };

  useEffect(() => {
    const loadCurso = async () => {
      const response = await getCurso();
      setCurso(response);
    };

    loadCurso();
  }, [curso]);

  const dados = [
    {
      component: (
        <InputGroup>
          <InputGroupText>Nome</InputGroupText>
          <Input
            type="text"
            onChange={(e) =>
              setInfo((prevState) => ({ ...prevState, nome: e.target.value }))
            }
          />
        </InputGroup>
      ),
    },
    {
      component: (
        <div className="d-flex gap-3">
          <InputGroup className="w-50">
            <InputGroupText>Turno</InputGroupText>
            <Input
              type="select"
              onChange={(e) =>
                setInfo((prevState) => ({
                  ...prevState,
                  turno: e.target.value,
                }))
              }
            >
              <option value="matutino">Matutino</option>
              <option value="vespertino">Vespertino</option>
              <option value="noturno">Noturno</option>
              <option value="integral">Integral</option>
            </Input>
          </InputGroup>
        </div>
      ),
    },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validationCourse(info)) {
      insertNewCurso(info);
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
        width: "60%",
      },
    },
    {
      dataField: "turno",
      text: "Turno",
      sort: true,
      style: {
        width: "40%",
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
        Adicionar curso
      </Button>
      <TableWithSearch data={curso} columns={columns} />

      <InsertModal
        open={modal}
        close={() => setModal(!modal)}
        name={"Curso"}
        dados={dados}
        submit={handleSubmit}
      />
    </div>
  );
}
