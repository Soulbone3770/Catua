import useBorrarPublicacion from "../hooks/useBorrarPublicacion";

interface Props{
    publicacionId: number;
    onBorrada: () => void;
}

const RemovePublicacionButton = ({publicacionId, onBorrada}: Props) => {

    const { borrar, loading, error, errorFatal } = useBorrarPublicacion();

    const handleBorrar = async(e: React.MouseEvent<HTMLButtonElement>) => {

        e.preventDefault();

        if (!window.confirm("Seguro que quiere borrar esta publicación?")) return

        const salioBien = await borrar(publicacionId);
        if(salioBien){ 
            onBorrada();
            alert("Publicacion borrada exitosamente");
        }
    }

    if (loading) return <p className="estado">Borrando...</p>

    if (errorFatal) return <p className="mensaje mensaje-error">{errorFatal}</p>

    return (
        <>
            <button className="btn btn-peligro" onClick={(e) => handleBorrar(e)} disabled={loading}>{loading ? "Borrando..." : "Borrar"}</button>
            {error && <p className="mensaje mensaje-error" role="alert">{error}</p>}
        </>
    )

};

export default RemovePublicacionButton;