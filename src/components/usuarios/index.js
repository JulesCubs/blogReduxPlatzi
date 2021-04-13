import React, { Component } from 'react';
//import axios from 'axios';
import { connect } from 'react-redux';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import Tabla from './Tabla';
import * as usuariosActions from '../../actions/usuariosActions';

//const App = () => {} Componente funcional o stateless
class Usuarios extends Component { //Componente clase o statefull
  //Al ser componente clase ya podemos agregar un constructor
  /* Se retira el constructor porque implemento Redux (hay un solo store que me da la informacion necesaria y la paso en el reducer)
  constructor() {
    super();
    this.state = {
      /*Se puede declarar el arreglo de un objeto, pero para efecto de revision 
      de ciclo de vida de manera correcta se realiza desde el componentDidMount*/
      /*usuarios: [
        {
          nombre: 'Julian',
          correo: 'jules@cubs.com',
          enlace: 'julescubs.com'
        },
        {
          nombre: 'Platzi',
          correo: 'platzi@platzi.com',
          enlace: 'platzi.com'
        }
      ] //
      usuarios: []
    }
  }*/

  componentDidMount() {
    /*const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');
    //console.log('respuesta', respuesta.data);
    this.setState({
      usuarios: respuesta.data
      [
        {
          nombre: 'Julian',
          correo: 'jules@cubs.com',
          enlace: 'julescubs.com'
        },
        {
          nombre: 'Platzi',
          correo: 'platzi@platzi.com',
          enlace: 'platzi.com'
        }
      ]
    }) */
    if (!this.props.usuarios.length) {
      this.props.traerTodos();
    }
  }

  ponerContenido = () => {
    if (this.props.cargando) {
      return <Spinner />
    }

    if (this.props.error) {
      return <Fatal mensaje={ this.props.error } />;
    }

    //return <Tabla usuarios={ this.props.usuarios } /> Sin usar redux se puede enviar el props mandando como parametro;
    return <Tabla />; //Usando redux configurando connect en Tabla.js
      //Convierto el siguiente codigo en un componente para mejorar la comprension del codigo y volverlo mas funcional
      /*<table className="tabla">
        <thead>
          <tr>
            <th>
              Nombre
            </th>
            <th>
              Correo
            </th>
            <th>
              Enlace
            </th>
          </tr>
        </thead>
        <tbody>
          { this.ponerFilas() }
        </tbody>
      </table>
    )*/
  }
  
  //const ponerFilas = () => [ Parte del componente funcional
  //La funcion ponerFilas la pongo en el nuevo componente junto a la tabla que se encontraba en ponerContenido
  /*ponerFilas = () => (
    //this.state.usuarios.map((usuario) => (
    this.props.usuarios.map((usuario) => (
      <tr key={ usuario.id }>
        <td>
          { usuario.name }
        </td>
        <td>
          { usuario.email }
        </td>
        <td>
          { usuario.website }
        </td>
      </tr>
    ))
  )*//*[
    <tr>
      <td>
        Julian
      </td>
      <td>
        Jules@Cubs.com
      </td>
      <td>
        Julescubs.com
      </td>
    </tr>,
    <tr>
      <td>
        Platzi
      </td>
      <td>
        platzi@platzi.com
      </td>
      <td>
        Platzi.com
      </td>
    </tr>
  ] Este metodo resultaria poco apropiado porque tendriamos que extender 
  el codigo tantas veces como fuera necesario si se necesitan muchas listas de una tabla*/

  /*Al realizar un component statefull se añade y se renderza dentro de una funcion render() 
  y el llamado de funciones se realiza con {this.funcion} */
  render() {
    //console.log(this.state.usuarios); 
    //console.log(this.props.cargando);
    //console.log(this.props.error);
    console.log(this.props);
    return (
      <div>
        <h1>Usuarios</h1>
        { this.ponerContenido() }
      </div>
    )
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
};

export default connect(mapStateToProps, usuariosActions)(Usuarios);