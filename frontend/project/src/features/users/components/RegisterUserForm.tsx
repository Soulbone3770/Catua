import useRegisterUser from "../hooks/useRegisterUser";
import useForm from "../../../shared/hooks/useForm";
import { useNavigate } from "react-router-dom";
import type { NewUserType } from "../types/UserType";

const RegisterUserForm = () => {

    const navigate = useNavigate();

    const { valores, handleOnChange, resetForm } = useForm<NewUserType>({"username": "", "email": "", "password": ""});
    const { mensajeExito, loading, register, error, errorFatal } = useRegisterUser();

    const handleSubmit = async(e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const salioBien = await register(valores);
        if(salioBien) {
            resetForm() 
            navigate("/login")
        };
    }

    if(loading) return <p className="estado">Cargando...</p>
    
    if(errorFatal) return <p className="mensaje mensaje-error">{errorFatal}</p>

    return (
        <div>
            <form className="formulario" onSubmit={handleSubmit}>
            <div className="campo"><label htmlFor="username">Usuario</label>
            <input id="username" name="username" type="text" autoComplete="username" value={valores.username} onChange={handleOnChange} /></div>
            <div className="campo"><label htmlFor="email">Correo</label>
            <input id="email" name="email" type="email" autoComplete="email" value={valores.email} onChange={handleOnChange} /></div>
            <div className="campo"><label htmlFor="password">Contraseña</label>
            <input id="password" name="password" type="password" autoComplete="new-password" value={valores.password} onChange={handleOnChange} /></div>

            {error && <p className="mensaje mensaje-error" role="alert">{error}</p>}
            {mensajeExito && <p className="mensaje mensaje-exito" role="status">{mensajeExito}</p>}

            <button type="submit" className="btn btn-primario" disabled={loading}>{loading ? "Registrando..." : "Registrate"}</button>
        </form>
        </div>
    );

};

export default RegisterUserForm;