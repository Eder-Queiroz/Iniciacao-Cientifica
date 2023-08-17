import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import DeleteModal from "../../components/DeleteModal";
import { useState, useEffect } from "react";
import { Button, InputGroup, InputGroupText } from "reactstrap";
import {
  deleteProfessor,
  getProfessor,
  insertProfessor,
  editProfessor,
} from "../../api/api";
import { Teacher } from "../../types/types";
import { toast } from "react-toastify";
import { FiEdit, FiDelete } from "react-icons/fi";

function Professores() {
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [info, setInfo] = useState<Teacher>({
    name: "",
    email: "",
  });
  const [professor, setProfessor] = useState([]);
  const [id, setId] = useState("");

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

  const handleEditClick = (row: any) => {
    setId(row.id);
    setInfo({
      name: row.name,
      email: row.email,
    });
    setModal(!modal);
  };

  const handleDeleteClick = (row: any) => {
    setId(row.id);
    setDeleteModal(!deleteModal);
  };

  const DeleteProfessor = async (id: string) => {
    const status = await deleteProfessor(id);

    if (status === 200) {
      toast.success(`Deletado com sucesso!`);
    } else {
      toast.error(`Erro ao deletar!`);
    }
    setId("");
    setDeleteModal(!deleteModal);
  };

  const EditProfessor = async (data: Teacher, id: string) => {
    const status = await editProfessor(data, id);

    if (status === 200) {
      toast.success(`Editado com sucesso!`);
    } else {
      toast.error(`Erro ao editar!`);
    }
    setId("");
    setInfo({
      name: "",
      email: "",
    });
    setModal(!modal);
  };

  useEffect(() => {
    const loadProfessor = async () => {
      const response = await getProfessor();
      setProfessor(response);
    };

    loadProfessor();
  }, [professor]);

  const dados = [
    {
      component: (
        <InputGroup>
          <InputGroupText>Nome</InputGroupText>
          <input
            type="text"
            defaultValue={info.name}
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
            defaultValue={info.email}
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
    if (id) {
      if (validationProfessor(info)) {
        EditProfessor(info, id);
      } else {
        toast.warn("Inválido, preencha os campos!");
      }
    } else {
      if (validationProfessor(info)) {
        insertNewProfessor(info);
      } else {
        toast.warn("Inválido, preencha os campos!");
      }
    }
  };

  const handleClose = () => {
    setId("");
    setInfo({
      name: "",
      email: "",
    });
    setModal(!modal);
  };

  const handleDelete = (e: any) => {
    e.preventDefault();
    DeleteProfessor(id);
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
        width: "30%",
      },
    },
    {
      dataField: "ações",
      text: "Ações",
      isDummyField: true, // Não está vinculado a qualquer campo de dados
      formatter: (cellContent: any, row: any) => {
        return (
          <div>
            <Button
              onClick={() => handleEditClick(row)}
              className="mr-2 noBorderAndColor"
            >
              <FiEdit className="text-black" />
            </Button>
            <Button
              onClick={() => handleDeleteClick(row)}
              className="noBorderAndColor"
            >
              <FiDelete className="text-black" />
            </Button>
          </div>
        );
      },
      style: {
        width: "5%",
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
        close={handleClose}
        name={"Professor"}
        dados={dados}
        submit={handleSubmit}
        id={id}
      />
      <DeleteModal
        open={deleteModal}
        close={() => setDeleteModal(!deleteModal)}
        name={"Professor"}
        delete={handleDelete}
      />
    </div>
  );
}

export default Professores;
