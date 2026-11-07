import { Link } from 'react-router-dom';
import PageLayout from '../shared/components/PageLayout';
import useGetContext from '../shared/hooks/useGetContext';

const Index = () => {

    const { autenticado } = useGetContext();

    return (
        <PageLayout>
            <section className="portada">
                <div>
                    <h1>Sube una foto y <span>ponle título</span></h1>
                    <p>Catua es el lugar para compartir tus imágenes y ver las de los demás.</p>
                    <div className="acciones">
                        {autenticado ? (
                            <>
                                <Link to="/hacerPublicacion" className="btn btn-primario">Hacer una publicación</Link>
                                <Link to="/misPublicaciones" className="btn">Ir a mis publicaciones</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/register" className="btn btn-primario">Crear cuenta</Link>
                                <Link to="/login" className="btn">Inicia sesión</Link>
                            </>
                        )}
                    </div>
                </div>
                <div className="pila" aria-hidden="true">
                    <div /><div /><div />
                </div>
            </section>
        </PageLayout>
    )
};

export default Index;
