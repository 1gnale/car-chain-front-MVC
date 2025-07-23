import HomePage from "../views/pages/HomePage";


const ControladorIndex = () => {

    // TODO - Implementar autenticación y pasar el estado isAuth a HomePage
    // Por ahora, se pasa isAuth como false para simular un usuario no autenticado

    return (
        <div>
            <HomePage isAuth={false} />
        </div>
    );
}

export default ControladorIndex;