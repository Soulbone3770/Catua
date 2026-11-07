import useForm from "../../../shared/hooks/useForm";
import useCreatePublicacion from "../hooks/useCreatePublicacion";
import { useState } from "react";

interface Props{
    onCreada: () => void
}

const CreatePublicacionForm = ({ onCreada }: Props) => {

    const { valores, handleOnChange, resetForm } = useForm({"titulo": ""});
    const [archivo, setArchivo] = useState<File | null>(null);
    const { crear, loading, error, errorFatal } = useCreatePublicacion();

    const handleSubmit = async(e: React.SubmitEvent<HTMLFormElement>) => {

        e.preventDefault();
        if(!archivo) return

        const formulario = e.currentTarget;
        const publicacion = await crear(valores.titulo, archivo);

        if(publicacion){
            formulario.reset();
            resetForm();
            setArchivo(null);
            onCreada();
        }

    };

    if(loading) return <p className="estado">Subiendo...</p>
    
    if(errorFatal) return <p className="mensaje mensaje-error">{errorFatal}</p>

    return (
        <form className="formulario" onSubmit={handleSubmit}>
            <div className="campo"><label htmlFor="titulo">Título</label>
            <input id="titulo" type="text" name="titulo" value={valores.titulo} onChange={handleOnChange} /></div>
            <div className="campo"><label htmlFor="imagen">Imagen</label>
            <input id="imagen" type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setArchivo(e.target.files?.[0] ?? null)} /></div>

            {error && <p className="mensaje mensaje-error" role="alert">{error}</p>}

            <button type="submit" className="btn btn-primario" disabled={loading}>{loading ? "Subiendo..." : "Publicar"}</button>

        </form>
    )

}

export default CreatePublicacionForm;