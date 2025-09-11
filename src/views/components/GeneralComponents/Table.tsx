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
    <>
      <style>{`

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background-color: #d6dce1ff;
        }
          
        .table-container {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .table th {
          background-color: #374151;
          color: white;
          padding: 16px;
          text-align: left;
          font-weight: 600;
          font-size: 14px;
        }
        
        .table td {
          padding: 16px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 14px;
        }
        
        .table tbody tr:hover {
        background-color: #f9fafb;
        }

        
      `}</style>

      <table className="table">
        <thead>
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
        <tbody>
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
    </>
  );
};

export default TableButton;
