import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";
import InsertModal from "../../components/InsertModal";
import { useState } from "react";
import { Button } from "reactstrap";

function Restrições() {
  const [modal, setModal] = useState(false);
  const Dados = ['Professor','Dia','Horário'];

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

      <InsertModal open = {modal} close={() => setModal(!modal)} name={'Restrição'} dados={Dados}/>
    </div>
  );
}

export default Restrições;
