import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import { useState, useEffect } from "react";
import { Button, InputGroup, InputGroupText } from "reactstrap";
import { getProfessor, insertProfessor } from "../../api/api";
import { Teacher } from "../../types/types";
import { toast } from "react-toastify";

function Professores() {
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState<Teacher>({
    name: "",
    email: "",
  });
  const [professor, setProfessor] = useState([]);

  const validationProfessor = (data: Teacher): boolean => {
    const { name, email } = data;

    if (!name || !email) {
      return false;
    }
    return true;
  };

  const insertNewProfessor = async (data: Teacher) => {
    const status = await insertProfessor(data);
    if (status === 200) {
      toast.success(`${info.name} adicionado com sucesso!`);
    } else {
      toast.error(`Erro ao adicionar ${info.name}!`);
    }
    setModal(!modal);
  };

  useEffect(() => {
    const loadProfessor = async () => {
      const response = await getProfessor();
      setProfessor(response);
    };

    loadProfessor();
    //console.log(professor);
  }, [professor]);

  const dados = [
    {
      component: (
        <InputGroup>
          <InputGroupText>Nome</InputGroupText>
          <input
            type="text"
            onChange={(e) =>
              setInfo((prevState) => ({ ...prevState, name: e.target.value }))
            }
            className="form-control"
          />
        </InputGroup>
      ),
    },
    {
      component: (
        <InputGroup>
          <InputGroupText>Email</InputGroupText>
          <input
            type="text"
            onChange={(e) =>
              setInfo((prevState) => ({ ...prevState, email: e.target.value }))
            }
            className="form-control"
          />
        </InputGroup>
      ),
    },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validationProfessor(info)) {
      insertNewProfessor(info);
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
      headerClasses: "column-with-filter",
      style: {
        width: "60%",
      },
    },
    {
      dataField: "email",
      text: "Email",
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
        Adicionar professor
      </Button>
      <TableWithSearch data={professor} columns={columns} />

      <InsertModal
        open={modal}
        close={() => setModal(!modal)}
        name={"Professor"}
        dados={dados}
        submit={handleSubmit}
      />
    </div>
  );
}

export default Professores;
