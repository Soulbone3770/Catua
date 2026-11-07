import useGetContext from "../../../shared/hooks/useGetContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

    const { autenticado, loading } = useGetContext();

    if(loading) return;

    if(autenticado === false){
        return <Navigate to="/login" replace></Navigate>
    }

    return children;

};

export default ProtectedRoute;