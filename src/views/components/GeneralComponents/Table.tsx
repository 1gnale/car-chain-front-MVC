import { Eye } from "react-bootstrap-icons";

interface tableContent {
  titles: string[];
  tableBody: tableBodys[];
}

interface tableBodys {
  key: number;
  rowContent: string[];
}

const TableButton = (tabla: tableContent) => {
  return (
    <table className="table table-hover table-responsive table-bordered">
      <thead className="table-dark">
        <tr>
          {tabla.titles.map((title) => (
            <th scope="col">{title}</th>
          ))}
          <th>"Boton"</th>
        </tr>
      </thead>
      <tbody className="table-Light">
        {tabla.tableBody?.map((tbody: tableBodys) => (
          <tr>
            {tbody.rowContent.map((cell) => (
              <td>{cell}</td>
            ))}
            <td className="text-center align-middle" style={{ width: "80px" }}>
              <div className="d-flex justify-content-center align-items-center">
                <Eye
                  style={{ cursor: "pointer" }}
                  onClick={() => console.log("Ay mi ojo xdxd!")}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableButton;
