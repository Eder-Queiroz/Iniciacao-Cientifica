import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";

function Turmas() {
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
    <div>
      <TableWithSearch data={data} columns={columns} />
    </div>
  );
}

export default Turmas;
