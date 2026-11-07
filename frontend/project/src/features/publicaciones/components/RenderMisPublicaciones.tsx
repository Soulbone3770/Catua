import type { PublicacionType } from "../types/PublicacionType";
import RemovePublicacionButton from "./RemovePublicacionButton";

interface Props{
    publicaciones: PublicacionType[] | null;
    loading: boolean;
    error: string;
    errorFatal: string;
    onBorrada: () => void;
}

const RenderMisPublicaciones = ({ publicaciones, loading, error, errorFatal, onBorrada }: Props) => {

    if(loading) return <p className="estado">Cargando tus publicaciones...</p>

    if(errorFatal) return <p className="mensaje mensaje-error">{errorFatal}</p>

    if(!publicaciones || publicaciones.length === 0) return (
        <div className="vacio">
            <strong>Todavía no has publicado nada</strong>
            Ve a Publicar para subir tu primera imagen.
        </div>
    )

    return (
        <div className="galeria">
            {publicaciones.map((p) => (
                <figure className="foto" key={p.id}>
                    <img src={p.imgUrl} alt={p.titulo} loading="lazy" />
                    <figcaption className="foto-pie">
                        <h2>{p.titulo}</h2>
                        <RemovePublicacionButton publicacionId={p.id} onBorrada={onBorrada} />
                    </figcaption>
                    {error && <p className="mensaje mensaje-error foto-error" role="alert">{error}</p>}
                </figure>
            ))}
        </div>
    )

};

export default RenderMisPublicaciones;
