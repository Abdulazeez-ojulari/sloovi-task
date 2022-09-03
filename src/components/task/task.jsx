import React, { Component } from "react";
import { axiosClient } from "../http-setting";

class Task extends Component{
    constructor(props){
        super(props)
        this.state = {
            task: {},
            fields: {
                status: '',
                taskName: '',
                duration: ''
            }
        }
    }

    componentDidMount(){
        
    }

    handleChange = (e) => {
        let fields = this.state.fields;
        this.setState({
          fields,
        });
        console.log(fields)
    }

    validate() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
    
        if (!fields["taskName"]) {
          formIsValid = false;
          errors["taskName"] = "*enter your Task Name.";
        }
    
        if (typeof fields["taskName"] !== "undefined") {
          if (!fields["taskName"].match(/^[a-zA-Z0-9_@#,.&+ ]*$/)) {
            formIsValid = false;
            errors["taskName"] = "*enter alphabet characters only.";
          }
        }

        if (!fields["status"]) {
            formIsValid = false;
            errors["status"] = "select a status";
        }
    
        this.setState({
          errors: errors,
        });
        return formIsValid;
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.validate()){
            let token = localStorage.getItem('x-auth-token');
            let {fields, task} = this.state;
            axiosClient.put('/task/' + task.id, fields, {
            headers: {
                'Access-Control-Allow-Headers': 'X-Requested-With',
                'x-auth-token': token
              }
            }
            ).then(res => {
                window.location.reload()
            }).catch(error => {
                console.log(error)
            })
        }
    }

    render(){
        const { task, assignedUser } = this.props;
        let time = task.task_date.split('-')
        return(
            <div className="task_summary">
                <div className="task_summary_col_1">
                    <div className="task_summary_col_1_col_1">
                        {assignedUser[0] &&
                        <img src={assignedUser[0].icon} alt='product' className="task_summary_img" />}
                    </div>
                    <div className="task_summary_col_1_col_2">
                        <h5 className="task_summary_desc">{task.task_msg}</h5>
                        <p className="task_summary_date">{parseInt(time[2]) + '/' + parseInt(time[1]) + '/' + time[0].slice(2)}</p>
                    </div>
                </div>
                <div className="task_summary_col_2"> 
                    <div className="task_summary_col_2_1">
                        <div onClick={() => {this.props.editTask(task)}}>
                            <span  className="iconify task_summary_col_2_icon" data-icon="bxs:pencil"></span>
                        </div>
                    </div>                    
                    <div className="task_summary_col_2_2">
                        <div>
                            <span  className="iconify task_summary_col_2_icon" data-icon="clarity:bell-solid-badged"></span>
                        </div>
                        <div className="line"></div>
                        <div>
                            <span  className="iconify task_summary_col_2_icon" data-icon="ci:check-big"></span>
                        </div>
                    </div>                    
                </div>
            </div>
        )
    }
}

export default Task;