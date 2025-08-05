import { useNavigate } from 'react-router-dom';

const TableButton = (tabla: tableContent) => {
  const navigate = useNavigate();

  const handleIconClick = (id: string | number) => {
    navigate(`/cotizacion/${id}`);
  };
  return (
    <table className="table table-hover table-responsive table-bordered">
      <thead className="table-dark">
        <tr>
          {tabla.titles.map((title, idx) => (
            <th scope="col" key={idx}>{title}</th>
          ))}
          {tabla.showButtom
            ? tabla.customIcons?.map((_, idx) => <th key={idx}></th>)
            : ""}
        </tr>
      </thead>
      <tbody className="table-Light">
        {tabla.tableBody?.map((tbody: tableBodys) => (
          <tr key={tbody.key}>
            {tbody.rowContent.map((cell, idx) => (
              <td key={idx}>{cell}</td>
            ))}

            {tabla.showButtom
              ? tabla.customIcons?.map((IconComponent, iconIdx) => (
                  <td
                    key={iconIdx}
                    className="text-center align-middle"
                    style={{ width: "80px" }}
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      <IconComponent
                        style={{ cursor: "pointer" }}
                        onClick={() => handleIconClick(tbody.key)}
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
