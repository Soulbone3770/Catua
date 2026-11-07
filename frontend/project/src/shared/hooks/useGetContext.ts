import { useContext } from "react"
import { AuthContext } from "../../features/auth/context/AuthContext";

const useGetContext = () => {

    const context = useContext(AuthContext);

    if(context === undefined) throw new Error("Error, fallo en el contexto de la sesión");

    return context

}

export default useGetContext;