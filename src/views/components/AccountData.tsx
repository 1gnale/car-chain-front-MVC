import GrayButton from "./GeneralComponents/Button";
import AccountDataInputs from "./FormAccountData/AccountDataInputs";
import { useState } from "react";
import AccountPolicy from "./FormAccountData/AccountPolicy";
import AccountPricings from "./FormAccountData/AccountPricings";
import RedButton from "./GeneralComponents/RedButton";
import { useAuth0 } from "@auth0/auth0-react";

const AccountData = () => {
  const { logout } = useAuth0();
  
  const mockUsuario: Cliente = {
    idClient: 1,
    id: 101,
    nombres: "Juan Carlos",
    apellido: "Pérez",
    fechaNacimiento: "1990-05-12",
    tipoDocumento: "DNI",
    documento: "30123456",
    domicilio: "Calle Falsa 123",
    correo: "juan.perez@example.com",
    telefono: "+54 9 381 4567890",
    sexo: "Masculino",
    contraseña: "1234Segura!",
    localidad: {
      id: 15,
      descripcion: "San Miguel de Tucumán",
      codigoPostal: "4000",
      provincia: {
        id: 2,
        descripcion: "Tucumán",
      },
    },
  };

  const [currentView, setCurrentView] = useState<number>(0);

  const views = [
    <AccountDataInputs user={mockUsuario} />,
    <AccountPolicy/>,
    <AccountPricings />,
  ]

  

  return (

    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-3">
          <div className="row" style={{ padding: "10px" }}>
            <GrayButton text="Datos" onClick={() => setCurrentView(0)} />
          </div>
          <div className="row" style={{ padding: "10px" }}>
            <GrayButton text="Polizas" onClick={() => setCurrentView(1)} />
          </div>
          <div className="row" style={{ padding: "10px" }}>
            <GrayButton text="Cotizaciones" onClick={() => setCurrentView(2)} />
          </div >
          <div className="row" style={{ padding: "10px" }}>
            <RedButton text="Cerrar Sesión" onClick={() => logout()} />
          </div>
        </div>
        {views[currentView]}
      </div>
    </div>
  );
};

export default AccountData;
