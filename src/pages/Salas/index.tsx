import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import { useState, useEffect } from "react";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import { insertSala, getSala, getTurma } from "../../api/api";
import { Room } from "../../types/types";
import { toast } from "react-toastify";
import Select from "react-select";

function Salas() {
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState<Room>({
    name: "",
    capacity: 1,
    fixed: false,
    class_id: "",
    building: "",
  });

  const [rooms, setRooms] = useState([]);
  const [classe, setClasse] = useState<object[]>([]);

  const validationClasse = (data: Room): boolean => {
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
              defaultValue='0'
              onChange={(e) =>
                setInfo((prevState) => ({
                  ...prevState,
                  fixed: e.target.value === '1' ? true : false,
                }))
              }
            >
              <option value='1'>Sim</option>
              <option value='0'>Não</option>
            </Input>
          </InputGroup>
        </div>
      ),
    },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validationClasse(info)) {
      insertNewSala(info);
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
      dataField: "turma_id",
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
        close={() => setModal(!modal)}
        name={"Sala"}
        dados={dados}
        submit={handleSubmit}
      />
    </div>
  );
}

export default Salas;
