import axios from "axios";
// import { axios } from "../components/http-setting";
import { ADD_TASK, DELETE_TASK, TASK_LOADED, UPDATE_TASK } from "../constants/action-constants";

export const addTask = (task) => {
    return function(dispatch) {
        return axios.post('/task', {fields: task})
            .then(res => {
                dispatch({ type: ADD_TASK, payload: res.data.results });
            }).catch(error => {
            })
    }
};

export const updateTask = (task, taskId) => {
    return function(dispatch) {
        return axios.put('/task', {fields: task, taskId: taskId})
            .then(res => {
                dispatch({ type: UPDATE_TASK, payload: res.data.results });
            }).catch(error => {
            })
    }
};

export const deleteTask = (taskId) => {
    return function(dispatch) {
        return axios.delete('/task/'+taskId)
            .then(res => {
                dispatch({ type: DELETE_TASK, payload: {taskId: taskId} });
            }).catch(error => {
            })
    }
};

export function getTasks() {
    return function(dispatch) {
        return axios.get('/tasks')
        .then(res => {
            dispatch({ type: TASK_LOADED, payload: res.data.results });
        })
    }

}