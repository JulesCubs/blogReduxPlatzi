import React, { Component } from "react";
import { connect } from "react-redux";
//import Cargando from "../general/Spinner";
import Fatal from "../general/Fatal";
import Comentarios from "./Comentarios";

import * as usuariosActions from "../../actions/usuariosActions";
import * as publicacionesActions from "../../actions/publicacionesActions";
import Spinner from "../general/Spinner";

//Destructuro y renombro las variables para que puedan traer los datos correspondientes
const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario: publicacionesTraerPorUsuario, abrirCerrar, traerComentarios } = publicacionesActions;

class Publicaciones extends Component {
	async componentDidMount() {
		const {
			usuariosTraerTodos,
			publicacionesTraerPorUsuario,
			match: {
				params: { key },
			},
		} = this.props; //Para reducir la ruta larga y asi asignar simplemente usuariosTraerTodos, publicacionesTraerPorUsuario y key.

		if (!this.props.usuariosReducer.usuarios.length) {
			// usuarioReducer no se acorta debido a que cada vez que realiza render varia ocasionaria problemas
			// y cuando hace el await el usuario no se actualizaria
			await usuariosTraerTodos();
		}
		if (this.props.usuariosReducer.error) {
			return;
		}
		if (!("publicaciones_key" in this.props.usuariosReducer.usuarios[key])) {
			publicacionesTraerPorUsuario(key);
		}
	}

	ponerUsuario = () => {
		const {
			usuariosReducer,
			match: {
				params: { key },
			},
		} = this.props;

		if (usuariosReducer.error) {
			return <Fatal mensaje={usuariosReducer.error} />;
		}

		if (!usuariosReducer.usuarios.length || usuariosReducer.cargando) {
			return <Spinner />;
		}

		const nombre = usuariosReducer.usuarios[key].name;

		return <h1>Publicaciones de {nombre}</h1>;
	};

	ponerPublicaciones = () => {
		const {
			// Aqui si se destructura usuariosReducer debido a que no se necesitaria que cambie de la manera que si se necesitaria en el VDOM
			usuariosReducer,
			usuariosReducer: { usuarios },
			publicacionesReducer,
			publicacionesReducer: { publicaciones },
			match: {
				params: { key },
			},
		} = this.props;

		if (!usuarios.length) return;
		if (usuariosReducer.error) return;
		if (publicacionesReducer.cargando) {
			return <Spinner />;
		}
		if (publicacionesReducer.error) {
			return <Fatal mensaje={publicacionesReducer.error} />;
		}
		if (!publicaciones.length) return;
		if (!("publicaciones_key" in usuarios[key])) return;

		const { publicaciones_key } = usuarios[key];

		return this.mostrarInfo(publicaciones[publicaciones_key], publicaciones_key);
	};

	mostrarInfo = (publicaciones, pub_key) =>
		publicaciones.map((publicacion, com_key) => (
			//onClick={() => alert(publicacion.id)} Antes de llamar funcion de  publicacionesActions
			<div key={publicacion.id} className='pub_titulo' onClick={() => this.mostrarComentarios(pub_key, com_key, publicacion.comentarios)}>
				<h2>{publicacion.title}</h2>
				<h3>{publicacion.body}</h3>
				{publicacion.abierto ? <Comentarios comentarios={publicacion.comentarios} /> : ""}
			</div>
		));

	mostrarComentarios = (pub_key, com_key, comentarios) => {
		console.log("comentarios: ", comentarios);
		this.props.abrirCerrar(pub_key, com_key);
		if (!comentarios.length) {
			this.props.traerComentarios(pub_key, com_key);
		}
	};

	render() {
		console.log(this.props);
		return (
			<div>
				{this.props.match.params.key}
				{this.ponerUsuario()}
				{this.ponerPublicaciones()}
			</div>
		);
	}
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
	return {
		usuariosReducer,
		publicacionesReducer,
	};
};

const mapDispatchToProps = {
	usuariosTraerTodos,
	publicacionesTraerPorUsuario,
	abrirCerrar,
	traerComentarios,
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
