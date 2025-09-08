import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TableButton = (tabla: tableContent) => {
  const [activeRows, setActiveRows] = useState<Record<number, boolean>>({});

  const toggleRow = (rowKey: number) => {
    setActiveRows((prev) => ({
      ...prev,
      [rowKey]: !prev[rowKey], // alterna true/false
    }));
  };

  return (
    <table className="table table-hover table-responsive table-bordered">
      <thead className="table-dark">
        <tr>
          {tabla.titles.map((title, idx) => (
            <th scope="col" key={idx}>
              {title}
            </th>
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
              ? tabla.customIcons?.map((iconConfig, iconIdx) => {
                  const IconDefault = iconConfig.customIcons;
                  const IconAlt = iconConfig.alternateIcon;
                  const active = iconConfig.isActive?.(tbody.value) ?? false;

                  return (
                    <td
                      key={iconIdx}
                      className="text-center align-middle"
                      style={{ width: "80px" }}
                    >
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          if (iconConfig.onAction) {
                            iconConfig.onAction(tbody.value ?? tbody.key);
                          }
                        }}
                      >
                        {active && IconAlt ? <IconAlt /> : <IconDefault />}
                      </div>
                    </td>
                  );
                })
              : ""}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableButton;
