import { CreatePublicacionForm, RenderAllPublicaciones, useGetAllPublicaciones} from "../features/publicaciones";
import PageLayout from "../shared/components/PageLayout";

const HacerPublicacion = () => {

    const { publicaciones, loading, error, errorFatal, getAll } = useGetAllPublicaciones();

    return (
        <PageLayout>
            <section className="seccion-publicar">
                <div className="encabezado">
                    <h1>Nueva publicación</h1>
                    <p>Elige una imagen (JPG, PNG o WebP) y ponle un título.</p>
                </div>
                <div className="tarjeta" style={{ maxWidth: 520 }}>
                    <CreatePublicacionForm onCreada={getAll}/>
                </div>
            </section>
            <div className="encabezado">
                <h1>Publicaciones</h1>
            </div>
            <RenderAllPublicaciones publicaciones={publicaciones} loading={loading} error={error} errorFatal={errorFatal} />
        </PageLayout>
    )
};

export default HacerPublicacion;
