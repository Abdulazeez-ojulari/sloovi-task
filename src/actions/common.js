import { axiosClient } from "../components/http-setting";
import { ASSIGNED_USERS_LOADED } from "../constants/action-constants";

export function getAssignedUsers() {
    return function(dispatch) {
        return axiosClient.get('https://stage.api.sloovi.com/team?product=outreach&company_id=company_413ef22b6237417fb1fba7917f0f69e7').then(res => {
            dispatch({ type: ASSIGNED_USERS_LOADED, payload: res.data.results.data });
        }).catch(({request}) => {
            console.log(request);
        })
    }

}