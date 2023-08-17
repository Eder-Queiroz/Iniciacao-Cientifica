import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import { useState, useEffect } from "react";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import {
  insertRestricao,
  getRestricao,
  getProfessor,
  deleteRestricao,
  editRestricao,
} from "../../api/api";
import Select from "react-select";
import { Restrictions } from "../../types/types";
import { toast } from "react-toastify";
import { FiEdit, FiDelete } from "react-icons/fi";
import DeleteModal from "../../components/DeleteModal";

function Restrições() {
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState<Restrictions>({
    teacher_id: "",
    day: 1,
    period: "manhã",
  });
  const [id, setId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [restriçao, setRestricao] = useState([]);
  const [professors, setProfessors] = useState<object[]>([]);

  const validationRestriction = (data: Restrictions): boolean => {
    const { teacher_id, day, period } = data;

    if (!teacher_id || !day || !period) {
      return false;
    }

    return true;
  };

  const insertNewRestricao = async (data: Restrictions) => {
    const status = await insertRestricao(data);
    if (status === 200) {
      toast.success("Restrição Adicionada com sucesso");
    } else {
      toast.error("Erro ao adicionar Restrição");
    }
    setModal(!modal);
  };

  const handleEditClick = (row: any) => {
    setId(row.id);
    setInfo({
      teacher_id: row.teacher_id,
      day: row.day,
      period: row.period,
    });
    setModal(!modal);
  };

  const handleDeleteClick = (row: any) => {
    setId(row.id);
    setDeleteModal(!deleteModal);
  };

  const DeleteRestrição = async (id: string) => {
    const status = await deleteRestricao(id);

    if (status === 200) {
      toast.success(`Deletado com sucesso!`);
    } else {
      toast.error(`Erro ao deletar!`);
    }
    setId("");
    setDeleteModal(!deleteModal);
  };

  const EditRestrição = async (data: Restrictions, id: string) => {
    const status = await editRestricao(data, id);

    if (status === 200) {
      toast.success(`Editado com sucesso!`);
    } else {
      toast.error(`Erro ao editar!`);
    }
    setId("");
    setInfo({
      teacher_id: "",
      day: 1,
      period: "manhã",
    });
    setModal(!modal);
  };

  const loadProfessor = async () => {
    const response = await getProfessor();
    const newProfessors: object[] = [
      { value: "none", label: "selecione um professor", disabled: true },
    ];
    response.map((professor: any) => {
      newProfessors.push({ value: professor.id, label: professor.name });
    });
    setProfessors(newProfessors);
  };

  useEffect(() => {
    const loadRestricao = async () => {
      const response = await getRestricao();
      setRestricao(response);
    };

    loadRestricao();
    loadProfessor();
  }, [restriçao]);

  const dados = [
    {
      component: (
        <InputGroup>
          <InputGroupText>Professor</InputGroupText>
          <Select
            className="basic-single form-control border-select"
            classNamePrefix="select"
            defaultValue={professors[0]}
            isClearable={true}
            isSearchable={true}
            name="teacher"
            options={professors}
            isOptionDisabled={(option: any) => option.disabled}
            onChange={(e: any) => {
              setInfo((prevState) => ({ ...prevState, teacher_id: e.value }));
            }}
          />
        </InputGroup>
      ),
    },
    {
      component: (
        <div className="d-flex gap-3">
          <InputGroup className="w-50">
            <InputGroupText>Dia</InputGroupText>
            <Input
              type="select"
              defaultValue={info.day}
              onChange={(e) =>
                setInfo((prevState) => ({
                  ...prevState,
                  day: parseInt(e.target.value),
                }))
              }
            >
              <option value="1">Segunda-Feira</option>
              <option value="2">Terça-Feira</option>
              <option value="3">Quarta-Feira</option>
              <option value="4">Quinta-Feira</option>
              <option value="5">Sexta-Feira</option>
            </Input>
          </InputGroup>
          <InputGroup className="w-50">
            <InputGroupText>Periodo</InputGroupText>
            <Input
              type="select"
              defaultValue={info.period}
              onChange={(e) =>
                setInfo((prevState) => ({
                  ...prevState,
                  period: e.target.value,
                }))
              }
            >
              <option value="manhã">Manhã</option>
              <option value="tarde">Tarde</option>
              <option value="noite">Noite</option>
            </Input>
          </InputGroup>
        </div>
      ),
    },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (id) {
      if (validationRestriction(info)) {
        EditRestrição(info, id);
      } else {
        toast.warn("Inválido, preencha os campos!");
      }
    } else {
      if (validationRestriction(info)) {
        insertNewRestricao(info);
      } else {
        toast.warn("Inválido, preencha os campos!");
      }
    }
  };

  const handleClose = () => {
    setId("");
    setInfo({
      teacher_id: "",
      day: 1,
      period: "manhã",
    });
    setModal(!modal);
  };

  const handleDelete = (e: any) => {
    e.preventDefault();
    DeleteRestrição(id);
  };
  const columns = [
    {
      dataField: "teacher.name",
      text: "Professor",
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
      dataField: "day",
      text: "Dia",
      sort: true,
      style: {
        width: "20%",
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
        Adicionar restrição
      </Button>
      <TableWithSearch data={restriçao} columns={columns} />

      <InsertModal
        open={modal}
        close={handleClose}
        name={"Restrição"}
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

export default Restrições;
