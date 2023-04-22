import TableWithSearch from "../../components/TableWithSearch/TableWithSearch";
import { textFilter } from "react-bootstrap-table2-filter";

function Professores() {
  const data = [
    {
      id: 1,
      name: "Eder Queiroz",
      email: "eder@queiroz.com",
    },
    {
      id: 2,
      name: "Luiz Folador",
      email: "luiz@folador.com",
    },
    {
      id: 3,
      name: "Eder Queiroz",
      email: "eder@queiroz.com",
    },
    {
      id: 4,
      name: "Luiz Folador",
      email: "luiz@folador.com",
    },
    {
      id: 5,
      name: "Eder Queiroz",
      email: "eder@queiroz.com",
    },
    {
      id: 6,
      name: "Luiz Folador",
      email: "luiz@folador.com",
    },
    {
      id: 7,
      name: "Eder Queiroz",
      email: "eder@queiroz.com",
    },
    {
      id: 8,
      name: "Luiz Folador",
      email: "luiz@folador.com",
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
      dataField: "email",
      text: "Email",
      sort: true,
      style: {
        width: "40%",
      },
    },
  ];

  return (
    <div>
      <TableWithSearch data={data} columns={columns} />
    </div>
  );
}

export default Professores;
