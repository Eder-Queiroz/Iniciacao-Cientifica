import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import DeleteModal from "../../components/DeleteModal";
import { useState, useEffect } from "react";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import { insertCurso, getCurso, editCurso, deleteCurso } from "../../api/api";
import { Course } from "../../types/types";
import { toast } from "react-toastify";
import { FiEdit, FiDelete } from "react-icons/fi";

export default function Cursos() {
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState<Course>({
    name: "",
    shift: "matutino",
    grouping: 1,
  });
  const [id, setId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [curso, setCurso] = useState([]);

  const validationCourse = (data: Course): boolean => {
    const { name, shift, grouping } = data;

    if (!name || !shift || !grouping) {
      return false;
    }

    return true;
  };

  const insertNewCurso = async (data: Course) => {
    const status = await insertCurso(data);
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
      shift: row.shift,
      grouping: row.grouping,
    });
    setModal(!modal);
  };

  const handleDeleteClick = (row: any) => {
    setId(row.id);
    setDeleteModal(!deleteModal);
  };

  const DeleteCurso = async (id: string) => {
    const status = await deleteCurso(id);

    if (status === 200) {
      toast.success(`Deletado com sucesso!`);
    } else {
      toast.error(`Erro ao deletar!`);
    }
    setId("");
    setDeleteModal(!deleteModal);
  };

  const EditCurso = async (data: Course, id: string) => {
    const status = await editCurso(data, id);

    if (status === 200) {
      toast.success(`Editado com sucesso!`);
    } else {
      toast.error(`Erro ao editar!`);
    }
    setId("");
    setInfo({
      name: "",
      shift: "matutino",
      grouping: 1,
    });
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
            defaultValue={info.name}
            onChange={(e) =>
              setInfo((prevState) => ({ ...prevState, name: e.target.value }))
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
              defaultValue={info.shift}
              onChange={(e) =>
                setInfo((prevState) => ({
                  ...prevState,
                  shift: e.target.value,
                }))
              }
            >
              <option value="matutino">Matutino</option>
              <option value="vespertino">Vespertino</option>
              <option value="noturno">Noturno</option>
              <option value="integral">Integral</option>
            </Input>
          </InputGroup>
          <InputGroup className="w-50">
            <InputGroupText>Grupo</InputGroupText>
            <Input
              type="select"
              defaultValue={info.grouping}
              onChange={(e) =>
                setInfo((prevState) => ({
                  ...prevState,
                  grouping: parseInt(e.target.value),
                }))
              }
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Input>
          </InputGroup>
        </div>
      ),
    },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (id) {
      if (validationCourse(info)) {
        EditCurso(info, id);
      } else {
        toast.warn("Inválido, preencha os campos!");
      }
    } else {
      if (validationCourse(info)) {
        insertNewCurso(info);
      } else {
        toast.warn("Inválido, preencha os campos!");
      }
    }
  };

  const handleClose = () => {
    setId("");
    setInfo({
      name: "",
      shift: "matutino",
      grouping: 1,
    });
    setModal(!modal);
  };

  const handleDelete = (e: any) => {
    e.preventDefault();
    DeleteCurso(id);
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
      dataField: "shift",
      text: "Turno",
      sort: true,
      style: {
        width: "20%",
      },
    },
    {
      dataField: "grouping",
      text: "Grupo",
      sort: true,
      style: {
        width: "20%",
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
        Adicionar curso
      </Button>
      <TableWithSearch data={curso} columns={columns} />

      <InsertModal
        open={modal}
        close={handleClose}
        name={"Curso"}
        dados={dados}
        submit={handleSubmit}
      />
      <DeleteModal
        open={deleteModal}
        close={() => setDeleteModal(!deleteModal)}
        name={"Curso"}
        delete={handleDelete}
      />
    </div>
  );
}
