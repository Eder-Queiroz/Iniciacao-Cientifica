import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import { useState, useEffect } from "react";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import { insertSala, getSala } from "../../api/api";
import { Room } from "../../types/types";
import { toast } from "react-toastify";

function Salas() {
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState<Room>({
    nome: "",
    capacidade: 1,
    qtdpcs: 0,
  });

  const [rooms, setRooms] = useState([]);
  const [status, setStatus] = useState<number>();

  const validationClasse = (data: Room): boolean => {
    const { nome, capacidade, qtdpcs } = data;

    if (!nome || !capacidade || !qtdpcs) {
      return false;
    }

    return true;
  };

  const insertNewSala = async (data: Room) => {
    const status = await insertSala(data);
    setStatus(status);
    setModal(!modal);
  };

  useEffect(() => {
    const loadSala = async () => {
      const response = await getSala();
      setRooms(response);
    };

    loadSala();
  }, []);

  const dados = [
    {
      component: (
        <InputGroup>
          <InputGroupText>Sala</InputGroupText>
          <Input
            type="text"
            onChange={(e) =>
              setInfo((prevState) => ({
                ...prevState,
                nome: e.target.value,
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
            <InputGroupText>Capacidade</InputGroupText>
            <Input
              type="text"
              onChange={(e) =>
                setInfo((prevState) => ({
                  ...prevState,
                  capacidade: parseInt(e.target.value),
                }))
              }
            />
          </InputGroup>
          <InputGroup className="w-50">
            <InputGroupText>Qdt.Computadores</InputGroupText>
            <Input
              type="text"
              onChange={(e) =>
                setInfo((prevState) => ({
                  ...prevState,
                  qtdpcs: parseInt(e.target.value),
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
      insertNewSala(info);
      if (status == 200) {
        toast.success("Turma adicionada com sucesso!");
      } else {
        toast.error("Erro ao adicionar Turma!");
      }
    } else {
      toast.warn("Inválido, preencha os campos!");
    }
  };

  const columns = [
    {
      dataField: "nome",
      text: "Salas",
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
      dataField: "capacidade",
      text: "Capacidade",
      sort: true,
      style: {
        width: "20%",
      },
    },
    {
      dataField: "qtdpcs",
      text: "Quantidade de Computadores",
      sort: true,
      style: {
        width: "20%",
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
