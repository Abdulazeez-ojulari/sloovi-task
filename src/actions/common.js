import { axiosClient } from "../components/http-setting";
import { ASSIGNED_USERS_LOADED } from "../constants/action-constants";

export function getAssignedUsers() {
    return function(dispatch) {
        return axiosClient.get('/board/managements').then(res => {
            dispatch({ type: ASSIGNED_USERS_LOADED, payload: res.data.results.data });
        }).catch(({request}) => {
            console.log(request);
        })
    }

}