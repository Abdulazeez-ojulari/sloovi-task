import { ADD_TASK, ASSIGNED_USERS_LOADED, DELETE_TASK, TASK_LOADED, UPDATE_TASK } from "../constants/action-constants";

const defaultTask = {
    tasks: [],
    remoteTasks: [],
    assignedUsers: [],
    remoteAssignedUsers: []
    }

const taskReducer = (state = defaultTask, action) => {

    switch (action.type) {
        case ADD_TASK:
            return Object.assign({}, state, {
                remoteTasks: state.remoteTasks.concat(action.payload)
            });
        case UPDATE_TASK:
            let tasks = state.remoteTasks.filter(task => {
                return task.id !== action.payload.id
            });
            
            return Object.assign({}, state, {
                remoteTasks: tasks.concat(action.payload)
            });
        case DELETE_TASK:
            let data = state.remoteTasks.filter(task => {
                return task.id !== action.payload.taskId
            });
            return Object.assign({}, state, {
                remoteTasks: data
            });
        case TASK_LOADED: {
            return Object.assign({}, state, {
                remoteTasks: action.payload
              });
        }
        case ASSIGNED_USERS_LOADED: {
            return Object.assign({}, state, {
                remoteAssignedUsers: action.payload
            });
        }
        default:
            return state;
    }
}

export default taskReducer