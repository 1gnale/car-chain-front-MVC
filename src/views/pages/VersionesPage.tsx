import Navbar from "../components/NavBar/Navbar";
import TitleSection from "../components/GeneralComponents/TitleSection";
import PageCasoEstudio03 from "../FuturePages/PageCasoEstudio03";
import PageCasoEstudio04 from "../FuturePages/PageCasoEstudio04";

const VersionesPage = ({ isAuth }: { isAuth: boolean }) => {


  return (
    <>
      <Navbar isAuth={isAuth} />
      <TitleSection title="VERSIONES" />
      <PageCasoEstudio04 />
    </>
  );
};

export default VersionesPage;