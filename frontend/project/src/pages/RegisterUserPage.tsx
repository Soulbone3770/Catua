import { RegisterUserForm } from "../features/users";
import { Link } from "react-router-dom";
import PageLayout from "../shared/components/PageLayout";

const RegisterUserPage = () => {

    return (
        <PageLayout estrecha>
            <div className="encabezado">
                <h1>Crea tu cuenta</h1>
            </div>
            <div className="tarjeta">
                <RegisterUserForm />
            </div>
            <p className="pie-formulario">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
        </PageLayout>
    );
};

export default RegisterUserPage;
