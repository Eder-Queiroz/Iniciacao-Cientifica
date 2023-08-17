import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import { useState, useEffect } from "react";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import {
  insertSala,
  getSala,
  getTurma,
  deleteSala,
  editSala,
} from "../../api/api";
import { Room } from "../../types/types";
import { toast } from "react-toastify";
import Select from "react-select";
import { FiEdit, FiDelete } from "react-icons/fi";
import DeleteModal from "../../components/DeleteModal";

function Salas() {
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState<Room>({
    name: "",
    capacity: 1,
    fixed: false,
    class_id: "",
    building: "",
  });
  const [id, setId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [classe, setClasse] = useState<object[]>([]);

  const validationRoom = (data: Room): boolean => {
    const { name, capacity, class_id, building } = data;

    console.log(data);

    if (!name || !capacity || !class_id || !building) {
      return false;
    }

    return true;
  };

  const loadClasse = async () => {
    const response = await getTurma();
    const newClasse: object[] = [
      { value: "none", label: "Selecione um curso", disabled: true },
    ];

    response.map((classe: any) => {
      newClasse.push({ value: classe.id, label: classe.name });
    });

    setClasse(newClasse);
  };

  const insertNewSala = async (data: Room) => {
    const status = await insertSala(data);
    if (status == 200) {
      toast.success("Turma adicionada com sucesso!");
    } else {
      toast.error("Erro ao adicionar Turma!");
    }
    setModal(!modal);
  };

  const handleEditClick = (row: any) => {
    setId(row.id);
    setInfo({
      name: row.name,
      capacity: row.capacity,
      fixed: row.fixed,
      class_id: row.class_id,
      building: row.building,
    });
    setModal(!modal);
  };

  const handleDeleteClick = (row: any) => {
    setId(row.id);
    setDeleteModal(!deleteModal);
  };

  const DeleteSala = async (id: string) => {
    const status = await deleteSala(id);

    if (status === 200) {
      toast.success(`Deletado com sucesso!`);
    } else {
      toast.error(`Erro ao deletar!`);
    }
    setId("");
    setDeleteModal(!deleteModal);
  };

  const EditSala = async (data: Room, id: string) => {
    const status = await editSala(data, id);

    if (status === 200) {
      toast.success(`Editado com sucesso!`);
    } else {
      toast.error(`Erro ao editar!`);
    }
    setId("");
    setInfo({
      name: "",
      capacity: 1,
      fixed: false,
      class_id: "",
      building: "",
    });
    setModal(!modal);
  };

  useEffect(() => {
    const loadSala = async () => {
      const response = await getSala();
      setRooms(response);
    };

    loadSala();
    loadClasse();
  }, [rooms]);

  const dados = [
    {
      component: (
        <InputGroup>
          <InputGroupText>Nome</InputGroupText>
          <Input
            type="text"
            defaultValue={info.name}
            onChange={(e) =>
              setInfo((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
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
            defaultValue={classe[0]}
            isClearable={true}
            isSearchable={true}
            name="course"
            options={classe}
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
        <div className="d-flex gap-3">
          <InputGroup className="w-50">
            <InputGroupText>Capacidade</InputGroupText>
            <Input
              type="text"
              defaultValue={info.capacity}
              onChange={(e) =>
                setInfo((prevState) => ({
                  ...prevState,
                  capacity: parseInt(e.target.value),
                }))
              }
            />
          </InputGroup>
          <InputGroup className="w-50">
            <InputGroupText>Predio</InputGroupText>
            <Input
              type="text"
              defaultValue={info.building}
              onChange={(e) =>
                setInfo((prevState) => ({
                  ...prevState,
                  building: e.target.value,
                }))
              }
            />
          </InputGroup>
        </div>
      ),
    },
    {
      component: (
        <div className="d-flex gap-3">
          <InputGroup className="w-50">
            <InputGroupText>Fixa</InputGroupText>
            <Input
              type="select"
              defaultValue={info.fixed == true ? "1" : "0"}
              onChange={(e) =>
                setInfo((prevState) => ({
                  ...prevState,
                  fixed: e.target.value === "1" ? true : false,
                }))
              }
            >
              <option value="1">Sim</option>
              <option value="0">Não</option>
            </Input>
          </InputGroup>
        </div>
      ),
    },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (id) {
      if (validationRoom(info)) {
        EditSala(info, id);
      } else {
        toast.warn("Inválido, preencha os campos!");
      }
    } else {
      if (validationRoom(info)) {
        insertNewSala(info);
      } else {
        toast.warn("Inválido, preencha os campos!");
      }
    }
  };

  const handleClose = () => {
    setId("");
    setInfo({
      name: "",
      capacity: 1,
      fixed: false,
      class_id: "",
      building: "",
    });
    setModal(!modal);
  };

  const handleDelete = (e: any) => {
    e.preventDefault();
    DeleteSala(id);
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
        width: "50%",
      },
    },
    {
      dataField: "capacity",
      text: "Capacidade",
      sort: true,
      style: {
        width: "20%",
      },
    },
    {
      dataField: "class.name",
      text: "Turma",
      sort: true,
      style: {
        width: "12%",
      },
    },
    {
      dataField: "building",
      text: "Predio",
      sort: true,
      style: {
        width: "12%",
      },
    },
    {
      dataField: "fixed",
      text: "Fixa",
      sort: true,
      style: {
        width: "12%",
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
        Adicionar Sala
      </Button>
      <TableWithSearch data={rooms} columns={columns} />

      <InsertModal
        open={modal}
        close={handleClose}
        name={"Sala"}
        dados={dados}
        submit={handleSubmit}
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

export default Salas;
