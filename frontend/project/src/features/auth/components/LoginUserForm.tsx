import useForm from "../../../shared/hooks/useForm";
import useLoginUser from "../hooks/useLoginUser";
import type { AuthInputType } from "../types/AuthType";
import { useNavigate } from "react-router-dom";


const LoginUserForm = () => {

    const navigate = useNavigate();

    const { valores, handleOnChange, resetForm } = useForm<AuthInputType>({ "username": "", "email": "", "password": "", "recuerdame": false });
    const { login, loading, error, mensajeExito, errorFatal } = useLoginUser();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {

        e.preventDefault();

        const exitoso = await login(valores);
        if (exitoso) {
            resetForm()
            navigate("/")
        };
    };

    if (loading) return <p className="estado">Cargando...</p>

    if (errorFatal) return <p className="mensaje mensaje-error">{errorFatal}</p>

    return (

        <form className="formulario" onSubmit={handleSubmit}>
            <div className="campo"><label htmlFor="username">Usuario</label>
                <input id="username" type="text" name="username" autoComplete="username" value={valores.username} onChange={handleOnChange} /></div>
            <div className="campo"><label htmlFor="email">Correo</label>
                <input id="email" type="email" name="email" autoComplete="email" value={valores.email} onChange={handleOnChange} /></div>
            <div className="campo"><label htmlFor="password">Contraseña</label>
                <input id="password" type="password" name="password" autoComplete="current-password" value={valores.password} onChange={handleOnChange} /></div>
            <div className="campo campo-check">
                <input id="recuerdame" type="checkbox" name="recuerdame" checked={valores.recuerdame} onChange={handleOnChange} />
                <label htmlFor="recuerdame">Recuérdame</label></div>

            {error && <p className="mensaje mensaje-error" role="alert">{error}</p>}
            {mensajeExito && <p className="mensaje mensaje-exito" role="status">{mensajeExito}</p>}

            <button type="submit" className="btn btn-primario" disabled={loading}>{loading ? "Iniciando Sesión..." : "Inicia Sesión"}</button>
        </form>

    )

};

export default LoginUserForm;