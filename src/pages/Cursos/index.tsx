import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";

export default function Cursos() {
  const data = [
    {
      id: 1,
      name: "Engenharia dos computers",
      shift: "matutino",
      grouping: "Não sei para que serve",
    },
    {
      id: 2,
      name: "ADS",
      shift: "noturno",
      grouping: "Não sei para que serve",
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
      dataField: "shift",
      text: "Turno",
      sort: true,
      style: {
        width: "20%",
      },
    },
    {
      dataField: "grouping",
      text: "Grupo",
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
