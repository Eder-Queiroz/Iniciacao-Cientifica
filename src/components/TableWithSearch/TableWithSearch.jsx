import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";

export default function TableWithSearch(info) {
  const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    prePageText: "Back",
    nextPageText: "Next",
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
      {
        text: "20",
        value: 20,
      },
      {
        text: "All",
        value: info.data.length,
      },
    ],
  };

  return (
    <div className="p-4">
      <BootstrapTable
        keyField="id"
        data={info.data}
        columns={info.columns}
        striped
        hover
        condensed
        pagination={paginationFactory(options)}
        filter={filterFactory()}
      />
    </div>
  );
}
