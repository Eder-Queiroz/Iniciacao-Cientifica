import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";

function Restrições() {
  const data = [
    {
      id: 1,
      teacher: "Daniela",
      day: "segunda",
      period: "3º",
    },
    {
      id: 2,
      teacher: "Leandro",
      day: "Quinta",
      period: "3º",
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
      dataField: "period",
      text: "Período",
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

export default Restrições;
