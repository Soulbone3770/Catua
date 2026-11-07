import { Link, NavLink } from "react-router-dom";
import { LogoutButton } from "../../features/auth";
import useGetContext from "../hooks/useGetContext";

interface Props {
    children: React.ReactNode;
    estrecha?: boolean;
}

const claseLink = ({ isActive }: { isActive: boolean }) =>
    `btn btn-suave${isActive ? " activo" : ""}`;

const PageLayout = ({ children, estrecha = false }: Props) => {

    const { autenticado, user } = useGetContext();

    return (
        <>
            <header className="navbar">
                <div className="navbar-inner">
                    <Link to="/" className="marca">Catua</Link>
                    <nav className="navbar-links">
                        {autenticado ? (
                            <>
                                <span className="saludo">Hola, {user?.username}</span>
                                <NavLink to="/hacerPublicacion" className={claseLink}>Publicar</NavLink>
                                <NavLink to="/misPublicaciones" className={claseLink}>Mis publicaciones</NavLink>
                                <LogoutButton />
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className={claseLink}>Inicia sesión</NavLink>
                                <Link to="/register" className="btn btn-primario">Regístrate</Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>
            <main className={`pagina${estrecha ? " pagina-estrecha" : ""}`}>
                {children}
            </main>
        </>
    );
};

export default PageLayout;
