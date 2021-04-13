import axios from "axios";
import { TRAER_TODAS, CARGANDO, ERROR, CAMBIO_USUARIO_ID, CAMBIO_TITULO, GUARDAR, ACTUALIZAR, LIMPIAR } from "../types/tareasTypes";

export const traerTodas = () => async (dispatch) => {
	dispatch({
		type: CARGANDO,
	});
	try {
		const respuesta = await axios.get("https://jsonplaceholder.typicode.com/todos");
		//console.log('respuesta', respuesta.data);
		const tareas = {};
		respuesta.data.map(
			(tarea) =>
				(tareas[tarea.userId] = {
					...tareas[tarea.userId],
					[tarea.id]: {
						...tarea,
					},
				})
		);
		dispatch({
			type: TRAER_TODAS,
			payload: tareas,
		});
	} catch (error) {
		console.log("Error: ", error.message);
		dispatch({
			type: ERROR,
			payload: "Información de tareas no disponible.",
		});
	}
};

export const cambioUsuarioId = (usuario_id) => (dispatch) => {
	dispatch({
		type: CAMBIO_USUARIO_ID,
		payload: usuario_id,
	});
};

export const cambioTitulo = (titulo) => (dispatch) => {
	dispatch({
		type: CAMBIO_TITULO,
		payload: titulo,
	});
};

export const agregar = (nueva_tarea) => async (dispatch) => {
	//console.log(nueva_tarea);
	dispatch({
		type: CARGANDO,
	});
	try {
		const respuesta = await axios.post("https://jsonplaceholder.typicode.com/todos", nueva_tarea);
		//console.log(respuesta.data);
		dispatch({
			type: GUARDAR,
		});
	} catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: "Intente mas tarde",
		});
	}
};

export const editar = (tarea_editada) => async (dispatch) => {
	//console.log(tarea_editada);
	dispatch({
		type: CARGANDO,
	});
	try {
		const respuesta = await axios.put(`https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`, tarea_editada);
		//console.log(respuesta.data);
		dispatch({
			type: GUARDAR,
		});
	} catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: "Intente mas tarde",
		});
	}
};

export const cambioCheck = (usuario_id, tarea_id) => (dispatch, getState) => {
	const { tareas } = getState().tareasReducer;
	const seleccionada = tareas[usuario_id][tarea_id];
	//Esto es la manera de bajar de nivel con solo el spread_operator solo entra a un nivel con JS puro(vanilla)
	//se puede hacer mas corto pero con una libreria.
	const actualizadas = {
		...tareas,
	};
	actualizadas[usuario_id] = {
		...tareas[usuario_id],
	};
	actualizadas[usuario_id][tarea_id] = {
		...tareas[usuario_id][tarea_id],
		completed: !seleccionada.completed,
	};

	dispatch({
		type: ACTUALIZAR,
		payload: actualizadas,
	});
};

export const eliminar = (tarea_id) => async (dispatch) => {
	dispatch({
		type: CARGANDO,
	});

	try {
		const respuesta = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${tarea_id}`);
		//console.log(respuesta);
		dispatch({
			type: TRAER_TODAS,
			payload: {},
		});
	} catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: "Servicio no disponible",
		});
	}
};

export const limpiarForma = () => (dispatch) => {
	dispatch({
		type: LIMPIAR,
	});
};
