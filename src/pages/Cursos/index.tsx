import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import { useState } from "react";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";

export default function Cursos() {
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState({
    name: '', 
    shift: '',
    grouping: '', 
  });

  const handleSubmit = () => {
    setModal(!modal);
  }

  const dados = [
    {
      component: (
        <InputGroup>
          <InputGroupText>Nome</InputGroupText>
          <Input type="text" onChange={(e) => setInfo((prevState) => ({...prevState ,name: e.target.value}))} />
        </InputGroup>
      ),
    },
    {
      component: (
        <div className="d-flex gap-3">
          <InputGroup className="w-50">
            <InputGroupText>Turno</InputGroupText>
            <Input type="select" onChange={(e) => setInfo((prevState) => ({...prevState ,shift: e.target.value}))} >
              <option value='matutino'>Matutino</option>
              <option value='vespertino'>Vespertino</option>
              <option value='noturno'>Noturno</option>
              <option value='integral'>Integral</option>
            </Input>
          </InputGroup>
          <InputGroup className="w-50">
            <InputGroupText>Grupo</InputGroupText>
            <Input type="select" onChange={(e) => setInfo((prevState) => ({...prevState ,grouping: e.target.value}))} >
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
            </Input>
          </InputGroup>
        </div>
      ),
    },
  ];
  
  const data = [
    {
      id:1,
      name: "Engenharia dos computers",
      shift: "matutino",
      grouping: "Não sei para que serve",
    },
    {
      id:2,
      name: "ADS",
      shift: "noturno",
      grouping: "Não sei para que serve",
    },
  ];

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
  ];

  //data.push(info);

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
      <TableWithSearch data={data} columns={columns} />

      <InsertModal
        open={modal}
        close={() => setModal(!modal)}
        name={"Curso"}
        dados={dados}
        submit={() => handleSubmit()}
      />
    </div>
  );
}
