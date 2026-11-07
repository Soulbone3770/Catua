import { RenderMisPublicaciones, useGetPublicacionesByUser } from "../features/publicaciones";
import PageLayout from "../shared/components/PageLayout";

const MisPublicacionesPage = () => {

    const { publicaciones, loading, error, errorFatal, getAll } = useGetPublicacionesByUser();

    return (
        <PageLayout>
            <div className="encabezado">
                <h1>Mis publicaciones</h1>
            </div>
            <RenderMisPublicaciones publicaciones={publicaciones} loading={loading} error={error} errorFatal={errorFatal} onBorrada={getAll} />
        </PageLayout>
    )
};

export default MisPublicacionesPage;
