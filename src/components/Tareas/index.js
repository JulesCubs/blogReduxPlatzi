import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../general/Spinner";
import Fatal from "../general/Fatal";

import * as tareasActions from "../../actions/tareasActions";

class Tareas extends Component {
	componentDidMount() {
		if (!Object.keys(this.props.tareas).length) {
			this.props.traerTodas();
		}
	}

	componentDidUpdate() {
		const { tareas, cargando, traerTodas } = this.props;
		if (!Object.keys(tareas).length && !cargando) {
			//this.props.traerTodas(); Esta linea se modifico al destructurar en linea 17
			traerTodas();
			//console.log(this.props);
		}
	}

	mostrarContenido = () => {
		const { tareas, cargando, error } = this.props;
		if (cargando) {
			return <Spinner />;
		}

		if (error) {
			return <Fatal mensaje={error} />;
		}

		return Object.keys(tareas).map((usuario_id) => (
			<div key={usuario_id}>
				<h2>Usuario{usuario_id}</h2>
				<div className='contenedor_tareas'>{this.ponerTareas(usuario_id)}</div>
			</div>
		));
	};

	ponerTareas = (usuario_id) => {
		const { tareas, cambioCheck, eliminar } = this.props;
		const por_usuario = {
			...tareas[usuario_id],
		};

		return Object.keys(por_usuario).map((tarea_id) => (
			<div key={tarea_id}>
				<input type='checkbox' defaultChecked={por_usuario[tarea_id].completed} onChange={() => cambioCheck(usuario_id, tarea_id)} />
				{por_usuario[tarea_id].title}
				<button className='m_left'>
					<Link to={`/tareas/guardar/${usuario_id}/${tarea_id}`}>Editar</Link>
				</button>
				<button className='m_left' onClick={() => eliminar(tarea_id)}>
					Eliminar
				</button>
			</div>
		));
	};
	render() {
		//console.log(this.props);
		//console.log(this.props.tareas);
		return (
			<div>
				<button>
					<Link to='/tareas/guardar'>Agregar</Link>
				</button>
				{this.mostrarContenido()}
			</div>
		);
	}
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas);
