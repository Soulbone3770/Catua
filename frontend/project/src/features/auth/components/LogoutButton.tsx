import useLogoutUser from "../hooks/useLogoutUser";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {

    const navigate = useNavigate();

    const { logout, loading, error, errorFatal } = useLogoutUser();

    if(loading) return <p className="estado">Cargando...</p>

    if(errorFatal) return <p className="mensaje mensaje-error">{errorFatal}</p>

    const handleLogout = async() => {

        if(!window.confirm("Seguro que quiere cerrar sesión?")) return

        const salioBien = await logout();
        if(salioBien){
            navigate("/");
        }

    }

    return (
        <>
            <button className="btn btn-suave" onClick={handleLogout} disabled={loading}>{loading ? "Cerrando sesión..." : "Cerrar sesión"}</button>
            {error && <p className="mensaje mensaje-error" role="alert">{error}</p>}
        </>
    )

};

export default LogoutButton;