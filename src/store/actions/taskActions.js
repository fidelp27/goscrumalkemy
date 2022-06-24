import { TASKS_REQUEST, TASKS_SUCCESS, TASKS_FAILURE } from "../types";
const { REACT_APP_API_ENDPOINT } = process.env;

// Para cada caso del fetch se conecta con el taskReducer
export const tasksRequest = () => ({
  type: TASKS_REQUEST,
});

export const tasksSuccess = (data) => ({
  type: TASKS_SUCCESS,
  payload: data,
});

export const tasksFailure = (error) => ({
  type: TASKS_FAILURE,
  payload: error,
});

// Se hace el fetch para traer las tareas por el reducer y no por el componente
export const getTasks = (path) => (dispatch) => {
  dispatch(tasksRequest());
  fetch(`${REACT_APP_API_ENDPOINT}task/${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => dispatch(tasksSuccess(data.result)))
    .catch((error) => dispatch(tasksFailure(error)));
};

export const deleteTask = (id) => (dispatch) => {
  fetch(`${REACT_APP_API_ENDPOINT}task/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then(() => dispatch(getTasks("")))
    .catch((error) => dispatch(tasksFailure(error)));
};

export const editTaskStatus = (data) => (dispatch) => {
  const status = ["NEW", "IN PROGRESS", "FINISHED"];
  const newStatusIndex =
    status.indexOf(data.status) > 1 ? 0 : status.indexOf(data.status) + 1;

  fetch(`${REACT_APP_API_ENDPOINT}task/${data._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      task: {
        title: data.title,
        importance: data.importance,
        status: status[newStatusIndex],
        description: data.description,
      },
    }),
  })
    .then((response) => response.json())
    .then(() => dispatch(getTasks("")))
    .catch((error) => dispatch(tasksFailure(error)));
};

export const addTask = (data) => (dispatch) => {
  fetch(`${REACT_APP_API_ENDPOINT}task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      task: { ...data },
    }),
  })
    .then((response) => response.json())
    .then(() => dispatch(getTasks("")))
    .catch((error) => dispatch(tasksFailure(error)));
};
