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

        /* Added responsive styles for mobile devices */
        @media (max-width: 768px) {
          .table-container {
            overflow-x: auto;
          }
          
          .table {
            min-width: 600px;
          }
          
          .table th,
          .table td {
            padding: 12px 8px;
            font-size: 12px;
          }
        }

        @media (max-width: 640px) {
          .table,
          .table thead,
          .table tbody,
          .table th,
          .table td,
          .table tr {
            display: block;
          }
          
          .table thead tr {
            position: absolute;
            top: -9999px;
            left: -9999px;
          }
          
          .table tr {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            margin-bottom: 12px;
            padding: 16px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          
          .table tr:hover {
            background-color: #f9fafb;
          }
          
          .table td {
            border: none;
            border-bottom: 1px solid #e5e7eb;
            position: relative;
            padding: 8px 0 8px 120px;
            margin-bottom: 8px;
            font-size: 14px;
          }
          
          .table td:last-child {
            border-bottom: none;
            margin-bottom: 0;
          }
          
          .table td:before {
            content: attr(data-label);
            position: absolute;
            left: 0;
            width: 110px;
            padding-right: 10px;
            white-space: nowrap;
            font-weight: 600;
            color: #374151;
            font-size: 12px;
          }
          
          .table td.text-center {
            text-align: left;
            padding-left: 120px;
          }
        }

        /* Added extra small screen optimizations */
        @media (max-width: 480px) {
          .table tr {
            padding: 12px;
          }
          
          .table td {
            padding: 6px 0 6px 100px;
            font-size: 13px;
          }
          
          .table td:before {
            width: 90px;
            font-size: 11px;
          }
          
          .table td.text-center {
            padding-left: 100px;
          }
        }
      `}</style>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {tabla.titles.map((title, idx) => (
                <th scope="col" key={idx}>
                  {title}
                </th>
              ))}
              {tabla.showButtom
                ? tabla.customIcons?.map((_, idx) => (
                    <th key={idx}>Acciones</th>
                  ))
                : ""}
            </tr>
          </thead>
          <tbody>
            {tabla.tableBody?.map((tbody: tableBodys) => (
              <tr key={tbody.key}>
                {tbody.rowContent.map((cell, idx) => (
                  <td key={idx} data-label={tabla.titles[idx]}>
                    {cell}
                  </td>
                ))}

                {tabla.showButtom
                  ? tabla.customIcons?.map((iconConfig, iconIdx) => {
                      const IconDefault = iconConfig.customIcons;
                      const IconAlt = iconConfig.alternateIcon;
                      const active =
                        iconConfig.isActive?.(tbody.value) ?? false;

                      return (
                        <td
                          key={iconIdx}
                          className="text-center align-middle"
                          style={{ width: "80px" }}
                          data-label="Acciones"
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
      </div>
    </>
  );
};

export default TableButton;
