import type { PublicacionType } from "../types/PublicacionType";

interface Props{
    publicaciones: PublicacionType[] | null;
    loading: boolean;
    error: string;
    errorFatal: string;
}

const RenderAllPublicaciones = ({ publicaciones, loading, error, errorFatal }: Props) => {

    if(loading) return <p className="estado">Cargando publicaciones...</p>

    if(errorFatal) return <p className="mensaje mensaje-error">{errorFatal}</p>

    if(!publicaciones || publicaciones.length === 0) return (
        <div className="vacio">
            <strong>Aún no hay publicaciones</strong>
            Sube la primera imagen con el formulario de arriba.
        </div>
    )

    return (
        <div className="galeria">
            {publicaciones.map((p) => (
                <figure className="foto" key={p.id}>
                    <img src={p.imgUrl} alt={p.titulo} loading="lazy" />
                    <figcaption className="foto-pie">
                        <h2>{p.titulo}</h2>
                    </figcaption>
                    {error && <p className="mensaje mensaje-error foto-error" role="alert">{error}</p>}
                </figure>
            ))}
        </div>
    )
};

export default RenderAllPublicaciones;
