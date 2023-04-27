import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import { useState } from "react";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";

function Turmas() {
  const [modal, setModal] = useState(false);
  const dados =[

    {
      component: (
        <InputGroup>
          <InputGroupText>Curso</InputGroupText>
          <Input type="select"> 
            <option>Engenharia de Computação</option>            
            <option>Análise e Desenvolvimento de Sistemas</option>
          </Input>
        </InputGroup>
      )
    },  
    {
      component: (
        <div className="d-flex gap-3">
            <InputGroup className="w-50">
              <InputGroupText>Período</InputGroupText>
              <Input type="select"> 
                <option>1°</option>            
                <option>2°</option>
                <option>3°</option>
                <option>4°</option>
                <option>5°</option>
                <option>6°</option>
                <option>7°</option>
                <option>8°</option>
                <option>9°</option>
                <option>10°</option>
              </Input>
          </InputGroup>
          <InputGroup className="w-50">
            <InputGroupText>Qdt.Alunos</InputGroupText>
            <Input type="text" />
          </InputGroup>
        </div>
        
      )
    },
    
  ];
  
  const data = [
    {
      id: 1,
      course: "Engenharia dos computers",
      period: "1º",
      numberStudents: "35",
    },
    {
      id: 2,
      course: "Engenharia dos computers",
      period: "2º",
      numberStudents: "20",
    },
    {
      id: 3,
      course: "Engenharia dos computers",
      period: "3º",
      numberStudents: "10",
    },
  ];

  const columns = [
    {
      dataField: "course",
      text: "Curso",
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
      dataField: "period",
      text: "Período",
      sort: true,
      style: {
        width: "20%",
      },
    },
    {
      dataField: "numberStudents",
      text: "Quantidade de Alunos",
      sort: true,
      style: {
        width: "20%",
      },
    },
  ];

  return (
    <div className="p-4 d-flex gap-3 flex-column">
      <Button onClick={() => setModal(true)} color="primary" outline style={{maxWidth: '20%'}}>Adicionar turma</Button>
      <TableWithSearch data={data} columns={columns} />

      <InsertModal open = {modal} close={() => setModal(!modal)} name={'Turma'} dados={dados}/>
    </div>
  );
}

export default Turmas;
