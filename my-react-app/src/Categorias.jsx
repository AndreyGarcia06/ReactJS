import { useEffect, useState } from "react";
import api from "./Services/api";
import "./Categorias.css";

function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const obtenerCategorias = async () => {
            try {
                const [categoriasResponse, productosResponse] = await Promise.all([
                    api.get("/categorias"),
                    api.get("/productos"),
                ]);

                const productos = Array.isArray(productosResponse.data) ? productosResponse.data : [];
                const categoriasApi = Array.isArray(categoriasResponse.data) ? categoriasResponse.data : [];

                const categoriasConImagen = categoriasApi.map((categoria) => {
                    const productoRelacionado = productos.find((producto) => String(producto.id_categoria) === String(categoria.id));
                    return {
                        ...categoria,
                        imagen: productoRelacionado?.image || productoRelacionado?.imagen || "",
                        productos: productos.filter((producto) => String(producto.id_categoria) === String(categoria.id)).length,
                    };
                });

                setCategorias(categoriasConImagen);
            } catch (err) {
                console.error("Error al obtener las categorías:", err);
                setError("No se pudieron cargar las categorías en este momento.");
            } finally {
                setCargando(false);
            }
        };

        obtenerCategorias();
    }, []);

    if (cargando) {
        return <p className="categoriasEstado">Cargando categorías...</p>;
    }

    if (error) {
        return <p className="categoriasEstado error">{error}</p>;
    }

    return (
        <div className="categoriasDiv">
            <h3 className="categoriasTitulo">Categorías de la tienda</h3>
            <p className="categoriasDescripcion">
                Estas categorías se cargan desde la API del backend.
            </p>

            <div className="categoriasGrid">
                {categorias.map((categoria) => (
                    <article className="categoriaCard" key={categoria.id}>
                        {categoria.imagen ? (
                            <img
                                src={categoria.imagen}
                                alt={categoria.nombre}
                                className="categoriaImagen"
                            />
                        ) : null}
                        <div className="categoriaContenido">
                            <h4>{categoria.nombre}</h4>
                            <p>{categoria.productos} producto(s) relacionados</p>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Categorias;
