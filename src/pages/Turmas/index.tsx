import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import { useState } from "react";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";

function Turmas() {
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState({
    course: '', 
    period: '',
    numberStudents: '', 
  });

  const handleSubmit = () => {
    setModal(!modal);
  }

  const dados =[

    {
      component: (
        <InputGroup>
          <InputGroupText>Curso</InputGroupText>
          <Input type="select" onChange={(e) => setInfo((prevState) => ({...prevState ,course: e.target.value}))}> 
            <option value='EC'>Engenharia de Computação</option>            
            <option value='ADS'>Análise e Desenvolvimento de Sistemas</option>
          </Input>
        </InputGroup>
      )
    },  
    {
      component: (
        <div className="d-flex gap-3">
             <InputGroup className="w-50">
            <InputGroupText>Período</InputGroupText>
            <Input type="select" onChange={(e) => setInfo((prevState) => ({...prevState ,period: e.target.value}))}> 
              <option value='1'>1°</option>            
              <option value='2'>2°</option>
              <option value='3'>3°</option>
              <option value='4'>4°</option>
              <option value='5'>5°</option>
              <option value='6'>6°</option>
              <option value='7'>7°</option>
              <option value='8'>8°</option>
              <option value='9'>9°</option>
              <option value='10'>10°</option>
            </Input>
        </InputGroup>
          <InputGroup className="w-50">
            <InputGroupText>Qdt.Alunos</InputGroupText>
            <Input type="text" onChange={(e) => setInfo((prevState) => ({...prevState ,numberStudents: e.target.value}))} />
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

      <InsertModal open = {modal} close={() => setModal(!modal)} name={'Turma'} dados={dados} submit={() => handleSubmit()}/>
    </div>
  );
}

export default Turmas;
