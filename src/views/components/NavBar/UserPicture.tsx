import perfilLogo from '../../assets/Logo.png';

const UserPicture = () => {
    return (
        <div className="navbar-nav ms-lg-auto">
            <a className="nav-link d-flex align-items-center" role="button">
                <b className="me-2">Perfil</b>
                <img
                    src={perfilLogo}
                    className="rounded-circle"
                    alt="Perfil"
                    height="30"
                    width="30"
                />
            </a>
        </div>
    );
};

export default UserPicture;
