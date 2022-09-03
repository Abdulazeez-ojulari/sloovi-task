import { ASSIGNED_USERS_LOADED } from "../constants/action-constants";

const defaultAssignedUsers = {
    assignedUsers: [],
    remoteAssignedUsers: []
    }

const assignedUsersReducer = (state = defaultAssignedUsers, action) => {

    if (action.type === ASSIGNED_USERS_LOADED) {
        return Object.assign({}, state, {
          remoteAssignedUsers: action.payload
        });
    }

    return state
}

export default assignedUsersReducer