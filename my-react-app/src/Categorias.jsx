import { useEffect, useState } from "react";
import axios from "axios";
import "./Categorias.css";

function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const obtenerCategorias = async () => {
            try {
                const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
                setCategorias(response.data.categories || []);
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
            <h3 className="categoriasTitulo">Categorías de comidas</h3>
            <p className="categoriasDescripcion">
                Comidas que se comen rico rico mmmm
            </p>

            <div className="categoriasGrid">
                {categorias.map((categoria) => (
                    <article className="categoriaCard" key={categoria.idCategory}>
                        <img
                            src={categoria.strCategoryThumb}
                            alt={categoria.strCategory}
                            className="categoriaImagen"
                        />
                        <div className="categoriaContenido">
                            <h4>{categoria.strCategory}</h4>
                            <p>{categoria.strCategoryDescription}</p>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Categorias;
