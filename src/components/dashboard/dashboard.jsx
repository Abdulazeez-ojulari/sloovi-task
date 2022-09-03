import React, { Component } from "react";
import './dashboard.css'
import TaskForm from "../task/taskForm";
import Task from "../task/task";
import { connect } from "react-redux";
import { getTasks } from "../../actions/task";
import { getAssignedUsers } from "../../actions/common";

class DashBoard extends Component{
    constructor(props){
        super(props);
        this.state = {
            sidebar: false,
            newAdd: false,
            taskUpdate: {
                assigned_user: '',
                date: new Date(),
                time: null,
                task_date: new Date().getFullYear()+'-'+ ((new Date().getMonth() + 1) < 10 && '0') +(new Date().getMonth() + 1)+'-'+ (new Date().getDate() < 10 && '0') +new Date().getDate(),
                task_time: 0,
                time_zone: 0,
                task_msg: '',
                is_completed: 0
            },
            assignedUsers: [],
            updateTask: false,
            taskId: null
        }
    }

    componentDidMount(){
        // {"status":"success",
        // "code":200,"message":"You are successfully logged in.",
        // "results":{"want_login":"yes",
        // "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjIxNjMyMDksIm5iZiI6MTY2MjE2MzIwOSwianRpIjoiMzkyMGY3NDEtZmNhZC00YmM2LWE4MGMtYjBkYjVlMTY2YTEwIiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1bmRhciBQaWNoYWkiLCJlbWFpbCI6InNtaXRod2lsbHMxOTg5QGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzRlZTRjZjY3YWQ0NzRhMjc5ODhiYzBhZmI4NGNmNDcyIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9jZjk0Yjc0YmQ0MWI0NjZiYjE4NWJkNGQ2NzRmMDMyYj9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.3ZdOwPIiAVQMBv4QoITBmlU_ZiVbwr2B-IRNc0L3iwM",
        // "is_first":0,
        // "icon":"http://www.gravatar.com/avatar/cf94b74bd41b466bb185bd4d674f032b?default=https%3A%2F%2Fs3.sloovi.com%2Favatar-default-icon.png",
        // "by_default":"outreach",
        // "company_id":"company_413ef22b6237417fb1fba7917f0f69e7",
        // "user_id":"user_4ee4cf67ad474a27988bc0afb84cf472",
        // "status":"active"},"module":"micro_company_user"}
        this.props.getTasks()
        this.props.getAssignedUsers()
        
    }

    // getTasks = () => {
    //     axiosClient.get('/board/tasks',
    //     {
    //         headers: {
    //             'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjIxNjMyMDksIm5iZiI6MTY2MjE2MzIwOSwianRpIjoiMzkyMGY3NDEtZmNhZC00YmM2LWE4MGMtYjBkYjVlMTY2YTEwIiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1bmRhciBQaWNoYWkiLCJlbWFpbCI6InNtaXRod2lsbHMxOTg5QGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzRlZTRjZjY3YWQ0NzRhMjc5ODhiYzBhZmI4NGNmNDcyIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9jZjk0Yjc0YmQ0MWI0NjZiYjE4NWJkNGQ2NzRmMDMyYj9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.3ZdOwPIiAVQMBv4QoITBmlU_ZiVbwr2B-IRNc0L3iwM',
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //           }
    //     }
    //     ).then(res => {
    //         console.log(res.data)
    //         this.setState({
    //             tasks: res.data.results
    //         })
    //     })
    // }

    // getAssignedUser = () => {
    //     axiosClient.get('/board/managements').then(res => {
    //         console.log(res.data)
    //         this.setState({
    //             assignedUsers: res.data.results.data
    //         })
    //     }).catch(({request}) => {
    //         console.log(request);
    //     })
    // }

    close = () => {
        this.setState({
          newAdd: false,
        });
    };

    add = () => {
        this.setState({
          newAdd: true,
          fields: {
            assigned_user: '',
            date: new Date(),
            time: null,
            task_date: new Date().getFullYear()+'-'+(new Date().getMonth() + 1)+'-'+new Date().getDate(),
            task_time: 0,
            time_zone: 0,
            task_msg: '',
            is_completed: 0
            },

            taskId: null,
            updateTask: false
        });
    };

    editTask = (task) =>{
        this.close()
        let d = new Date(task.task_date_time_in_utc_string);
        this.setState({
            taskUpdate: {
                assigned_user: task.assigned_user,
                date: d,
                time: d,
                task_date: d.getFullYear()+'-'+ ((d.getMonth() + 1) < 10 && '0') +(d.getMonth() + 1)+'-'+ (d.getDate() < 10 && '0') +d.getDate(),
                task_time: (d.getHours()*3600) + (d.getMinutes()*60),
                time_zone: (d.getUTCHours()*3600) + (d.getUTCMinutes()*60),
                task_msg: task.task_msg,
                is_completed: task.is_completed
            },
            taskId: task.id,
            updateTask: true,
            newAdd: true,
        })
    }
    
    render(){
        const { newAdd, updateTask, taskId, taskUpdate } = this.state;
        const { tasks, assignedUsers } = this.props;

        let tasksDetails = tasks.map(task => {
            return(
                <Task 
                task={task} key={task.id} 
                editTask={this.editTask}
                assignedUser={assignedUsers.filter(user => user.id === task.assigned_user)}></Task>
            )
        })

        return(
            <React.Fragment>
                <div className="dashBoard_container">
                    <div className="dashBoard_col_1">
                        
                    </div>
                    <div className="dashBoard_col_2">
                        <div className="dashBoard_col_2_row_1" ></div>
                        <div className="dashBoard_col_2_row_2">
                            <div className="dashBoard_tasks_section">
                                <div onClick={this.add} className="add_task">
                                    <div className="task_count">
                                        <h6>Tasks</h6>
                                        {tasks !== undefined &&
                                        <p>{tasks.length}</p>}
                                    </div>
                                    <span  className="iconify add_task_icon" data-icon="akar-icons:plus"></span>
                                </div>
                                { newAdd && 
                                <TaskForm
                                assignedUsers={assignedUsers}
                                update={updateTask}
                                taskId={taskId}
                                taskUpdate={taskUpdate}
                                 close={this.close}></TaskForm>
                                }
                                {!newAdd && tasks.length > 0 && 
                                    tasksDetails
                                }
                            </div>
                        </div>
                    </div>
                </div>
                
            </React.Fragment>
        )
    }
}

function mapStateToProp(state) {
    return {
      tasks: state.remoteTasks,
      assignedUsers: state.remoteAssignedUsers
    };
  }

export default connect(
    mapStateToProp,
    { getTasks, getAssignedUsers },
  )(DashBoard);

// export default DashBoard;