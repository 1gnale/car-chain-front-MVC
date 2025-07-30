import AccountData from "../views/components/AccountData";
import BreadCrumbNav from "../views/components/GeneralComponents/BreadCrumbNav";
import TitleSection from "../views/components/GeneralComponents/TitleSection";
import Navbar from "../views/components/Navbar";
import { useAuth0 } from "@auth0/auth0-react";

const ControladorPerfil = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <>
            <Navbar isAuth={isAuthenticated} />
            <TitleSection title="Datos" />
            <BreadCrumbNav items={[{ page: "Perfil" }]} />
            <AccountData />
        </>
    )
}

export default ControladorPerfil;