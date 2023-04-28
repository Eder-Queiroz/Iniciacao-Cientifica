import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import { useState } from "react";
import { Button,Input,InputGroup,InputGroupText } from "reactstrap";

function Restrições() {
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState({
    teacher: '', 
    day: '',
    time: '', 
  });
  const dados =[
    {
      component: (
        <InputGroup>
          <InputGroupText>Professor</InputGroupText>
          <Input type="text" onChange={(e) => setInfo((prevState) => ({...prevState ,teacher: e.target.value}))} />
        </InputGroup>
      ),
    },
    {
      component: (
        <div className="d-flex gap-3">
            <InputGroup className="w-50">
              <InputGroupText>Dia</InputGroupText>
              <Input type="select" onChange={(e) => setInfo((prevState) => ({...prevState ,day: e.target.value}))} > 
                <option value='segunda-feira'>Segunda-Feira</option>            
                <option value='terça-feira'>Terça-Feira</option>
                <option value='quarta-feira'>Quarta-Feira</option>
                <option value='quinta-feira'>Quinta-Feira</option>
                <option value='sexta-feira'>Sexta-Feira</option>
              </Input>
          </InputGroup>
          <InputGroup className="w-50">
            <InputGroupText>Horário</InputGroupText>
            <Input type="select" onChange={(e) => setInfo((prevState) => ({...prevState ,time: e.target.value}))} > 
              <option value='manhã'>Manhã</option>            
              <option value='tarde'>Tarde</option>
              <option value='noite'>Noite</option>
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
