import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import { useState, useEffect } from "react";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import { insertRestricao, getRestricao, getProfessor } from "../../api/api";
import Select from "react-select";

function Restrições() {
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState({
    teacher: "",
    day: "segunda-feira",
    time: "manhã",
  });

  const [restriçao, setRestricao] = useState([]);
  const [professors, setProfessors] = useState<object[]>([]);
  const [status, setStatus] = useState({});

  const insertNewRestricao = async (data: object) => {
    const status = await insertRestricao(data);
    setStatus({ status: status });
  };

  const loadProfessor = async () => {
    const response = await getProfessor();
    const newProfessors: object[] = [];
    response.map((professor: any) => {
      newProfessors.push({ value: professor.name, label: professor.name });
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
  }, []);

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
                setInfo((prevState) => ({ ...prevState, day: e.target.value }))
              }
            >
              <option value="segunda-feira">Segunda-Feira</option>
              <option value="terça-feira">Terça-Feira</option>
              <option value="quarta-feira">Quarta-Feira</option>
              <option value="quinta-feira">Quinta-Feira</option>
              <option value="sexta-feira">Sexta-Feira</option>
            </Input>
          </InputGroup>
          <InputGroup className="w-50">
            <InputGroupText>Horário</InputGroupText>
            <Input
              type="select"
              defaultValue="manhã"
              onChange={(e) =>
                setInfo((prevState) => ({ ...prevState, time: e.target.value }))
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
    insertNewRestricao(info);
    window.location.reload();
  };

  const columns = [
    {
      dataField: "teacher",
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
      dataField: "time",
      text: "Horário",
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
