const TableButton = (tabla: tableContent) => {
  return (
    <table className="table table-hover table-responsive table-bordered">
      <thead className="table-dark">
        <tr>
          {tabla.titles.map((title) => (
            <th scope="col">{title}</th>
          ))}
          {tabla.showButtom
            ? tabla.customIcons?.map((IconComponent) => <th></th>)
            : ""}
        </tr>
      </thead>
      <tbody className="table-Light">
        {tabla.tableBody?.map((tbody: tableBodys) => (
          <tr>
            {tbody.rowContent.map((cell) => (
              <td>{cell}</td>
            ))}

            {tabla.showButtom
              ? tabla.customIcons?.map((IconComponent) => (
                  <td
                    className="text-center align-middle"
                    style={{ width: "80px" }}
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      <IconComponent
                        style={{ cursor: "pointer" }}
                        onClick={() => console.log("Ay mi ojo xdxd!")}
                      />
                    </div>
                  </td>
                ))
              : ""}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableButton;
