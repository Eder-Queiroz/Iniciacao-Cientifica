import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import { useState } from "react";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";

function Professores() {
  const [modal, setModal] = useState(false);
  
  const dados = [
    {
      component: (
        <InputGroup>
          <InputGroupText>Nome</InputGroupText>
          <Input type="text" />
        </InputGroup>
      ),
    },
    {
      component: (
        <InputGroup>
          <InputGroupText>Email</InputGroupText>
          <Input type="text" />
        </InputGroup>
      ),
    },
  ];
  
  const data = [
    {
      id: 1,
      name: "Eder Queiroz",
      email: "eder@queiroz.com",
    },
    {
      id: 2,
      name: "Luiz Folador",
      email: "luiz@folador.com",
    },
    {
      id: 3,
      name: "Eder Queiroz",
      email: "eder@queiroz.com",
    },
    {
      id: 4,
      name: "Luiz Folador",
      email: "luiz@folador.com",
    },
    {
      id: 5,
      name: "Eder Queiroz",
      email: "eder@queiroz.com",
    },
    {
      id: 6,
      name: "Luiz Folador",
      email: "luiz@folador.com",
    },
    {
      id: 7,
      name: "Eder Queiroz",
      email: "eder@queiroz.com",
    },
    {
      id: 8,
      name: "Luiz Folador",
      email: "luiz@folador.com",
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
      dataField: "email",
      text: "Email",
      sort: true,
      style: {
        width: "40%",
      },
    },
  ];

  return (
    <div className="p-4 d-flex gap-3 flex-column">
      <Button onClick={() => setModal(true)} color="primary" outline style={{maxWidth: '20%'}}>Adicionar professor</Button>
      <TableWithSearch data={data} columns={columns} />

      <InsertModal open = {modal} close={() => setModal(!modal)} name={'Professor'} dados={dados}/>
    </div>
  );
}

export default Professores;
