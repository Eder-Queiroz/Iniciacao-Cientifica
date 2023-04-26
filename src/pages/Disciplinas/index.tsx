import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import { useState } from "react";
import { Button } from "reactstrap";

function Disciplinas() {
  const [modal, setModal] = useState(false);
  const Dados = ['Disciplina','Curso','Período','Qtd. Aulas', 'Professor'];

  const data = [
    {
      id: 1,
      name: "Calculo I",
      course: "Engenharia dos Computers",
      period: "1º",
      numberClasses: "40",
      teacher: "Leandro",
    },
    {
      id: 2,
      name: "Calculo II",
      course: "Engenharia dos Computers",
      period: "2º",
      numberClasses: "850",
      teacher: "Leandro",
    },
  ];

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
      <TableWithSearch data={data} columns={columns} />

      <InsertModal open = {modal} close={() => setModal(!modal)} name={'Disciplina'} dados={Dados}/>
    </div>
  );
}

export default Disciplinas;
