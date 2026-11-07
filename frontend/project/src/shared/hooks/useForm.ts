import { useState } from "react";

const useForm = <T extends object>(valoresIniciales: T) => {

    const[valores, setValores] = useState(valoresIniciales);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.type === "checkbox"){
            return setValores(prev => ({
                ...prev,
                [e.target.name]: e.target.checked
            }));
        }

        setValores(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const resetForm = () => {
        setValores(valoresIniciales);
    };

    return { valores, handleOnChange, resetForm };

};

export default useForm;