import {useEffect, useState} from 'react';
import api from './Services/api';
import './Usuarios.css';

function Usuarios () {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState (true);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await api.get ('/users');
        setUsuarios(response.data);
      }catch( error) {
        console.error ('Error al obtener usuario:', error);
      }finally {
        setCargando(false);
      }
    };
    obtenerUsuarios();
  }, []);

  if(cargando) return <p> Cargando usuarios ...</p>

    return (
        <div className = "usuariosDiv">
          <h3 className="usuariosTitulo">Usuarios</h3>
          <table className="usuariosTabla">
            <thead>
              <tr>
                  <th> Id </th>
                  <th> Email </th>
                  <th> Nombre de usuario </th>
                  <th> Contraseña </th>
                  <th> Nombre </th>
                  <th> Apellido </th>
                  <th> Teléfono </th>
                  <th> Acciones </th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                    <td className="col-id" data-label="Id"> {usuario.id} </td>
                    <td className="col-email" data-label="Email"> {usuario.email} </td>
                    <td data-label="Usuario"> {usuario.username} </td>
                    <td data-label="Contraseña"> {usuario.password} </td>
                    <td data-label="Nombre"> {usuario.name.firstname} </td>
                    <td data-label="Apellido"> {usuario.name.lastname} </td>
                    <td data-label="Teléfono"> {usuario.phone} </td>
                    <td data-label="Acciones">
                      <div className="usuariosAcciones">
                        <button className="usuariosBtn danger"> Eliminar</button>
                        <button className="usuariosBtn"> Editar </button>
                      </div>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    )
}

export default Usuarios