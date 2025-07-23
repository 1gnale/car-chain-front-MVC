import Carrusel from "../components/Carrusel"
import Navbar from "../components/Navbar";

const HomePage = ({ isAuth } : { isAuth: boolean }) => {
    return (
        <>
            <Navbar isAuth={isAuth} />
            <Carrusel />
        </>
    )
}

export default HomePage;