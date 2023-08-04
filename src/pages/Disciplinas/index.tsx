import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import React, { useState, useEffect } from "react";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import { insertDisciplina, getDisciplina } from "../../api/api";
import { Subject } from "../../types/types";
import { toast } from "react-toastify";

function Disciplinas() {
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState<Subject>({
    nome: "",
    periodo: 1,
  });

  const [discplina, setDiscplina] = useState([]);

  const validationSubject = (data: Subject): boolean => {
    const { nome, periodo } = data;

    if (!nome || !periodo) {
      return false;
    }

    return true;
  };

  const insertNewDisciplina = async (data: Subject) => {
    const status = await insertDisciplina(data);
    if (status === 200) {
      toast.success(`${info.nome} adicionado com sucesso!`);
    } else {
      toast.error(`Erro ao adicionar ${info.nome}!`);
    }
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
            <InputGroupText>Período</InputGroupText>
            <Input
              type="select"
              defaultValue="1°"
              onChange={(e) =>
                setInfo((prevState) => ({
                  ...prevState,
                  periodo: parseInt(e.target.value),
                }))
              }
            >
              <option value="1°">1°</option>
              <option value="2°">2°</option>
              <option value="3°">3°</option>
              <option value="4°">4°</option>
              <option value="5°">5°</option>
              <option value="6°">6°</option>
              <option value="7°">7°</option>
              <option value="8°">8°</option>
              <option value="9°">9°</option>
              <option value="10°">10°</option>
            </Input>
          </InputGroup>
        </div>
      ),
    },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validationSubject(info)) {
      insertNewDisciplina(info);
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
      dataField: "periodo",
      text: "Periodo",
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
        Adicionar disciplina
      </Button>
      <TableWithSearch data={discplina} columns={columns} />

      <InsertModal
        open={modal}
        close={() => setModal(!modal)}
        name={"Disciplina"}
        dados={dados}
        submit={handleSubmit}
      />
    </div>
  );
}

export default Disciplinas;
