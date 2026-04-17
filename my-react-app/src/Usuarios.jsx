import {useEffect, useState} from 'react';
import api from './Services/api';
import './Usuarios.css';
import RegistrarUsuario from './RegistrarUsuario';

function Usuarios () {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState (true);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const formatearFecha = (valor) => {
    if (!valor) return '—';
    const fecha = new Date(valor);
    if (Number.isNaN(fecha.getTime())) return valor;
    return fecha.toLocaleDateString();
  };

  const obtenerUsuarios = async () => {
      try {
        let response;
        try {
          response = await api.get('/usuarios');
        } catch {
          response = await api.get('/users');
        }
        setUsuarios(Array.isArray(response.data) ? response.data : []);
      }catch( error) {
        console.error ('Error al obtener usuario:', error);
      }finally {
        setCargando(false);
      }
    };

  const removeUsuario = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este usuario?')) return;

    try {
      try {
        await api.delete(`/usuarios/${id}`);
      } catch {
        await api.delete(`/users/${id}`);
      }
      setUsuarios((prev) => prev.filter((usuario) => usuario.id !== id));
      if (usuarioSeleccionado?.id === id) {
        setUsuarioSeleccionado(null);
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert('No se pudo eliminar el usuario');
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  if(cargando) return <p> Cargando usuarios ...</p>

    return (
        <>
          <RegistrarUsuario
          usuarioEditado={usuarioSeleccionado}
          limpiarSeleccion={() => setUsuarioSeleccionado(null)}
          onActualizacionExitosa={obtenerUsuarios} />
          <div className = "usuariosDiv">
            <h3 className="usuariosTitulo">Usuarios</h3>
          <table className="usuariosTabla">
            <thead>
              <tr>
                  <th> Id </th>
                  <th> Nombre </th>
                  <th> Dirección </th>
                  <th> Telefono </th>
                  <th> Email </th>
                  <th> Password </th>
                  <th> Rol </th>
                  <th> Fecha de registro </th>
                  <th> Acciones </th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                    <td className="col-id" data-label="Id"> {usuario.id} </td>
                    <td data-label="Nombre"> {usuario.nombre || `${usuario?.name?.firstname || ''} ${usuario?.name?.lastname || ''}`.trim() || usuario.username || '—'} </td>
                    <td data-label="Dirección"> {usuario.direccion || [usuario?.address?.street, usuario?.address?.number, usuario?.address?.city].filter(Boolean).join(', ') || '—'} </td>
                    <td data-label="Telefono"> {usuario.telefono || usuario.phone || '—'} </td>
                    <td className="col-email" data-label="Email"> {usuario.email || '—'} </td>
                    <td data-label="Password"> {usuario.password || '—'} </td>
                    <td data-label="Rol"> {usuario.rol || usuario.role || 'usuario'} </td>
                    <td data-label="Fecha de registro"> {formatearFecha(usuario.fechaRegistro || usuario.createdAt)} </td>
                    <td data-label="Acciones">
                      <div className="usuariosAcciones">
                        <button className="usuariosBtn danger" onClick = {() => removeUsuario(usuario.id)}> Eliminar </button>
                        <button className="usuariosBtn" onClick={() => setUsuarioSeleccionado(usuario)}> Editar </button>
                      </div>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </>
    )
}

export default Usuarios