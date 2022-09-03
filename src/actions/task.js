import { axiosClient } from "../components/http-setting";
import { ADD_TASK, DELETE_TASK, TASK_LOADED, UPDATE_TASK } from "../constants/action-constants";

export const addTask = (task) => {
    return function(dispatch) {
        return axiosClient.post('/board/task', {fields: task})
            .then(res => {
                dispatch({ type: ADD_TASK, payload: res.data.results });
            }).catch(error => {
            })
    }
};

export const updateTask = (task, taskId) => {
    return function(dispatch) {
        return axiosClient.put('/board/task', {fields: task, taskId: taskId})
            .then(res => {
                dispatch({ type: UPDATE_TASK, payload: res.data.results });
            }).catch(error => {
            })
    }
};

export const deleteTask = (taskId) => {
    return function(dispatch) {
        return axiosClient.delete('/board/task/'+taskId,)
            .then(res => {
                dispatch({ type: DELETE_TASK, payload: {taskId: taskId} });
            }).catch(error => {
            })
    }
};

export function getTasks() {
    return function(dispatch) {
        return axiosClient.get('/board/tasks')
        .then(res => {
            dispatch({ type: TASK_LOADED, payload: res.data.results });
        })
    }

}