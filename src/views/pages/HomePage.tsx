import Carrusel from "../components/Home/Carrusel";
import Navbar from "../components/NavBar/Navbar";

const HomePage = ({ isAuth }: { isAuth: boolean }) => {
  return (
    <>
      <Navbar isAuth={isAuth} />
      <Carrusel />
    </>
  );
};

export default HomePage;
