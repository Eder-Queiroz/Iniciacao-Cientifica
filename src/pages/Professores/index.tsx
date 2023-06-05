import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import { useState, useEffect } from "react";
import { Button, InputGroup, InputGroupText } from "reactstrap";
import { getProfessor, insertProfessor } from "../../api/api";

function Professores() {
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    email: "",
  });
  const [professor, setProfessor] = useState([]);
  const [status, setStatus] = useState({});

  const insertNewProfessor = async (data: object) => {
    const status = await insertProfessor(data);
    setStatus({ status: status });
    window.location.reload();
  };

  useEffect(() => {
    const loadProfessor = async () => {
      const response = await getProfessor();
      setProfessor(response);
    };

    loadProfessor();
  }, []);

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
    insertNewProfessor(info);
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
