import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import React, { useState, useEffect } from "react";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import {
  insertDisciplina,
  getDisciplina,
  deleteDisciplina,
  editDisciplina,
} from "../../api/api";
import { Discipline } from "../../types/types";
import { toast } from "react-toastify";
import { FiEdit, FiDelete } from "react-icons/fi";
import DeleteModal from "../../components/DeleteModal";

function Disciplinas() {
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState<Discipline>({
    name: "",
    period: 1,
  });
  const [id, setId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [discplina, setDiscplina] = useState([]);

  const validationDiscipline = (data: Discipline): boolean => {
    const { name, period } = data;

    if (!name || !period) {
      return false;
    }

    return true;
  };

  const insertNewDisciplina = async (data: Discipline) => {
    const status = await insertDisciplina(data);
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
      period: row.period,
    });
    setModal(!modal);
  };

  const handleDeleteClick = (row: any) => {
    setId(row.id);
    setDeleteModal(!deleteModal);
  };

  const DeleteDisciplina = async (id: string) => {
    const status = await deleteDisciplina(id);

    if (status === 200) {
      toast.success(`Deletado com sucesso!`);
    } else {
      toast.error(`Erro ao deletar!`);
    }
    setId("");
    setDeleteModal(!deleteModal);
  };

  const EditDisciplina = async (data: Discipline, id: string) => {
    const status = await editDisciplina(data, id);

    if (status === 200) {
      toast.success(`Editado com sucesso!`);
    } else {
      toast.error(`Erro ao editar!`);
    }
    setId("");
    setInfo({
      name: "",
      period: 1,
    });
    setModal(!modal);
  };

  useEffect(() => {
    const loadDiscplina = async () => {
      const response = await getDisciplina();
      setDiscplina(response);
    };

    loadDiscplina();
  }, [discplina]);

  const dados = [
    {
      component: (
        <InputGroup>
          <InputGroupText>Disciplina</InputGroupText>
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
        <div className="d-flex gap-3">
          <InputGroup className="w-50">
            <InputGroupText>Período</InputGroupText>
            <Input
              type="select"
              defaultValue={info.period}
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
        </div>
      ),
    },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (id) {
      if (validationDiscipline(info)) {
        EditDisciplina(info, id);
      } else {
        toast.warn("Inválido, preencha os campos!");
      }
    } else {
      if (validationDiscipline(info)) {
        insertNewDisciplina(info);
      } else {
        toast.warn("Inválido, preencha os campos!");
      }
    }
  };

  const handleClose = () => {
    setId("");
    setInfo({
      name: "",

      period: 1,
    });
    setModal(!modal);
  };

  const handleDelete = (e: any) => {
    e.preventDefault();
    DeleteDisciplina(id);
  };

  const columns = [
    {
      dataField: "name",
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
        width: "60%",
      },
    },
    {
      dataField: "period",
      text: "Periodo",
      sort: true,
      style: {
        width: "40%",
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
        Adicionar disciplina
      </Button>
      <TableWithSearch data={discplina} columns={columns} />

      <InsertModal
        open={modal}
        close={handleClose}
        name={"Disciplina"}
        dados={dados}
        submit={handleSubmit}
      />
      <DeleteModal
        open={deleteModal}
        close={() => setDeleteModal(!deleteModal)}
        name={"Disciplina"}
        delete={handleDelete}
      />
    </div>
  );
}

export default Disciplinas;
