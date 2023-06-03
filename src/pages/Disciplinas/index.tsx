import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import { useState, useEffect } from "react";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import {insertDisciplina,getDisciplina} from '../../api/api';

function Disciplinas() {
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState({
    name: '', 
    course: '',
    period: '', 
    numberClasses: '',
    teacher: '',
  });

  const [discplina, setDiscplina] = useState([]);
  const [status, setStatus] = useState({});

  const insertNewDisciplina = async (data: object) => {
    const status = await insertDisciplina(data);
    setStatus({ status: status });
  };

  useEffect(() => {
    const loadDiscplina = async () => {
      const response = await getDisciplina();
      setDiscplina(response);
    };

    loadDiscplina();
  }, []);

  const dados =[
    {
      component: (
        <InputGroup>
          <InputGroupText>Disciplina</InputGroupText>
          <Input type="text" onChange={(e) => setInfo((prevState) => ({...prevState ,name: e.target.value}))} />
        </InputGroup>
      ),
    },
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
        <InputGroup>
          <InputGroupText>Curso</InputGroupText>
          <Input type="select" defaultValue="EC" onChange={(e) => setInfo((prevState) => ({...prevState ,course: e.target.value}))}> 
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
            <Input type="select" defaultValue="1" onChange={(e) => setInfo((prevState) => ({...prevState ,period: e.target.value}))}> 
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
          <InputGroupText>Qtd.Aulas</InputGroupText>
            <Input type="select" defaultValue="1" onChange={(e) => setInfo((prevState) => ({...prevState ,numberClasses: e.target.value}))}> 
              <option value='1'>1</option>            
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
            </Input>
        </InputGroup>
        </div>
      )
    },
    
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    insertNewDisciplina(info);
    window.location.reload();
  };

  const columns = [
    {
      dataField: "name",
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
        width: "40%",
      },
    },
    {
      dataField: "course",
      text: "Curso",
      sort: true,
      style: {
        width: "20%",
      },
    },
    {
      dataField: "period",
      text: "Periodo",
      sort: true,
      style: {
        width: "10%",
      },
    },
    {
      dataField: "numberClasses",
      text: "Qnt. Aulas",
      sort: true,
      style: {
        width: "10%",
      },
    },
    {
      dataField: "teacher",
      text: "Professor",
      sort: true,
      style: {
        width: "20%",
      },
    },
  ];

  return (
    <div className="p-4 d-flex gap-3 flex-column">
      <Button onClick={() => setModal(true)} color="primary" outline style={{maxWidth: '20%'}}>Adicionar disciplina</Button>
      <TableWithSearch data={discplina} columns={columns} />

      <InsertModal open = {modal} close={() => setModal(!modal)} name={'Disciplina'} dados={dados} submit={handleSubmit}/>
    </div>
  );
}

export default Disciplinas;
