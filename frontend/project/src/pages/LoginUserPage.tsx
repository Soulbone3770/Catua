import { LoginUserForm } from "../features/auth"
import { Link } from "react-router-dom";
import PageLayout from "../shared/components/PageLayout";

const LoginUserPage = () => {

    return (
        <PageLayout estrecha>
            <div className="encabezado">
                <h1>Inicia sesión</h1>
            </div>
            <div className="tarjeta">
                <LoginUserForm />
            </div>
            <p className="pie-formulario">¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
        </PageLayout>
    )
};

export default LoginUserPage;
