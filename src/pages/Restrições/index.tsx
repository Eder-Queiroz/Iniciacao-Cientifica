import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import { useState } from "react";
import { Button,Input,InputGroup,InputGroupText } from "reactstrap";

function Restrições() {
  const [modal, setModal] = useState(false);
  const dados =[
    {
      component: (
        <InputGroup>
          <InputGroupText>Professor</InputGroupText>
          <Input type="text" />
        </InputGroup>
      ),
    },
    {
      component: (
        <div className="d-flex gap-3">
            <InputGroup className="w-50">
              <InputGroupText>Dia</InputGroupText>
              <Input type="select"> 
                <option>Segunda-Feira</option>            
                <option>Terça-Feira</option>
                <option>Quarta-Feira</option>
                <option>Quinta-Feira</option>
                <option>Sexta-Feira</option>
              </Input>
          </InputGroup>
          <InputGroup className="w-50">
            <InputGroupText>Horário</InputGroupText>
            <Input type="select"> 
              <option>Manhã</option>            
              <option>Tarde</option>
              <option>Noite</option>
            </Input>
          </InputGroup>
        </div>
        
      )
    },
  ];

  const data = [
    {
      id: 1,
      teacher: "Daniela",
      day: "segunda",
      time: "tarde",
    },
    {
      id: 2,
      teacher: "Leandro",
      day: "Quinta",
      time: "tarde",
    },
  ];

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
      <Button onClick={() => setModal(true)} color="primary" outline style={{maxWidth: '20%'}}>Adicionar restrição</Button>
      <TableWithSearch data={data} columns={columns} />

      <InsertModal open = {modal} close={() => setModal(!modal)} name={'Restrição'} dados={dados}/>
    </div>
  );
}

export default Restrições;
