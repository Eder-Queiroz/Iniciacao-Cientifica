import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import { useState, useEffect } from "react";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import { insertRestricao, getRestricao, getProfessor } from "../../api/api";
import Select from "react-select";
import { Restrictions } from "../../types/types";
import { toast } from "react-toastify";

function Restrições() {
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState<Restrictions>({
    teacher_id: "",
    day: 1,
    period: "manhã",
  });

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
              defaultValue="segunda-feira"
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
              defaultValue="manhã"
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
    if (validationRestriction(info)) {
      insertNewRestricao(info);
    } else {
      toast.warn("Inválido, preencha os campos!");
    }
  };

  const columns = [
    {
      dataField: "teacher_id",
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
        close={() => setModal(!modal)}
        name={"Restrição"}
        dados={dados}
        submit={handleSubmit}
      />
    </div>
  );
}

export default Restrições;
