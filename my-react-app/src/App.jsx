import Encabezado from "./Encabezado";

function app () {
  
  return (
    <div>
      <Encabezado />
      <h1> 5A EVND </h1>
      <h2> Profesor: </h2>
      <h3> M.T.I Ricardo Luna Santos </h3>
      <UserComponent />
      <ProfileComponent />
      <FeedComponent />
    </div>
)
}

function UserComponent() {
  const nombre = 'Andrey';
  const apellidos = 'Ortega Garcia';
  const nombreCompleto = <h2>El nombre es: {nombre} y sus apellidos: {apellidos}</h2>
  return <h1> User Component {nombreCompleto}</h1>
}

function ProfileComponent() {
  const users = [
    {id: 1, name: 'Diego', role: 'Web Developer'},
    {id: 2, name: 'Andrea', role: 'Web Designer'},
    {id: 3, name: 'Paola', role: 'Team Leader'},
  ]
  return (
  <>
  <p>Lista de los usarios del sistema</p>
  <ul> {
    users.map (function(user, index) {
      return (
        <li key = {index}>{user.name} es un {user.role}</li>
      )
    })}
  </ul>
  </>
  )
}

function FeedComponent() {
  const mats = [
    {id: 1, mat: 'Block'},
    {id: 2, mat: 'Arena'},
    {id: 3, mat: 'Cemento'},
    {id: 4, mat: 'Tabique'},
  ]
  return (
    <>
    <p>Materiales de material para construir material</p>
    <ul> {
      mats.map (function(mats, index) {
        return (
          <li key = {index}> {mats.mat} sirve para construir construcciones construidas con material de construcción </li>
        )
      })
     } </ul>
    </>
  )
}

export default app
