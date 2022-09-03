import { axiosClient } from "../components/http-setting";
import { ADD_TASK, DELETE_TASK, TASK_LOADED, UPDATE_TASK } from "../constants/action-constants";

export const addTask = (task) => {
    return function(dispatch) {
        return axiosClient.post('?company_id=company_413ef22b6237417fb1fba7917f0f69e7', 
        {
            assigned_user:  task.assigned_user, 
            task_date: task.task_date,
            task_time: task.task_time ,
            is_completed: task.is_completed,
            time_zone: task.task_time - task.time_zone,
            task_msg: task.task_msg
        })
            .then(res => {
                dispatch({ type: ADD_TASK, payload: res.data.results });
            }).catch(error => {
            })
    }
};

export const updateTask = (task, taskId) => {
    return function(dispatch) {
        return axiosClient.put('/'+ taskId + '?company_id=company_413ef22b6237417fb1fba7917f0f69e7', 
        {
            assigned_user:  task.assigned_user, 
            task_date: task.task_date,
            task_time: task.task_time ,
            is_completed: task.is_completed,
            time_zone: task.task_time - task.time_zone,
            task_msg: task.task_msg
        })
            .then(res => {
                dispatch({ type: UPDATE_TASK, payload: res.data.results });
            }).catch(error => {
            })
    }
};

export const deleteTask = (taskId) => {
    return function(dispatch) {
        return axiosClient.delete('/'+ taskId + '?company_id=company_413ef22b6237417fb1fba7917f0f69e7')
            .then(res => {
                dispatch({ type: DELETE_TASK, payload: {taskId: taskId} });
            }).catch(error => {
            })
    }
};

export function getTasks() {
    return function(dispatch) {
        return axiosClient.get('?company_id=company_413ef22b6237417fb1fba7917f0f69e7')
        .then(res => {
            dispatch({ type: TASK_LOADED, payload: res.data.results });
        })
    }

}