import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";

function Disciplinas() {
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
    <div>
      <TableWithSearch data={data} columns={columns} />
    </div>
  );
}

export default Disciplinas;
