import React, { Component } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addTask, deleteTask, updateTask } from "../../actions/task";
import './task.css';
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
    return {
      addTask: task => dispatch(addTask(task)),
      updateTask: (task, taskId) => dispatch(updateTask(task,taskId)),
      deleteTask: (taskId) => dispatch(deleteTask(taskId))
    };
}

class ConnectedTask extends Component{
    constructor(props){
        super(props);
        this.state = {
            fields: {
                assigned_user: '',
                date: new Date(),
                time: null,
                task_date: new Date().getFullYear()+'-'+ ((new Date().getMonth() + 1) < 10 ? '0' : '') +(new Date().getMonth() + 1)+'-'+ (new Date().getDate() < 10 ? '0' : '') +new Date().getDate(),
                task_time: 0,
                time_zone: 0,
                task_msg: '',
                is_completed: 0
            },
            assignedUsers: [],
            loading: false,
            update: false,
            taskId: null
        }
    }

    componentDidMount(){
        const { update, taskUpdate, taskId } = this.props;
        if(update){
            this.setState({
                fields: taskUpdate,
                taskId: taskId,
                update: update
            })
        }
    }

    addTask = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        })
        const { fields } = this.state;
        if(this.validate()){
            this.props.close()
            this.setState({
                loading: false
            })
            this.props.addTask(fields);
        }else{
            this.setState({
                loading: false
            })
        }
    }

    updateTask = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        })
        const { fields, taskId } = this.state;
        if(taskId !== null){
            if(this.validate()){
                this.props.close()
                this.setState({
                    loading: false
                })
                this.props.updateTask(fields, taskId);
            }else{
                this.setState({
                    loading: false
                })
            }
        }
    }

    deleteTask = () => {
        this.setState({
            loading: true
        })
        const { taskId } = this.state;
        if(taskId !== null){
            this.props.close()
            this.setState({
                loading: false
            })
            this.props.deleteTask(taskId);
        }
    }

    handleChange = (e) => {
        let fields = this.state.fields;
        const { name, value } = e.target;
        fields[name] = value;
        this.setState({
          fields,
        });
    }

    handleDate = (date) => {
        let fields = this.state.fields;
        let d = new Date(date)
        fields['date'] = date;
        fields['task_date'] = d.getFullYear()+'-'+ ((d.getMonth() + 1) < 10 ? '0': '') +(d.getMonth()+1) + '-'+ (d.getDate() < 10 ? '0' : '') +d.getDate();
        this.setState({
            fields,
          });
    }

    handleTime = (date) => {
        let fields = this.state.fields;
        let d = new Date(date)
        fields['time'] = date;
        fields['task_time'] = (d.getHours()*3600) + (d.getMinutes()*60);
        fields['time_zone'] = (d.getUTCHours()*3600) + (d.getUTCMinutes()*60);
        this.setState({
            fields,
          });
    }

    validate() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if (!fields["task_msg"]) {
          formIsValid = false;
          errors["task_msg"] = "Enter task message";
        }
    
        if (typeof fields["task_msg"] !== "undefined") {
          if (!fields["task_msg"].match(/^[a-zA-Z0-9_@#,.&+ ]*$/)) {
            formIsValid = false;
            errors["task_msg"] = "*enter alphabet characters only.";
          }
        }

        if (!fields["assigned_user"]) {
            formIsValid = false;
            errors["assigned_user"] = "Select assigned user";
          }
        
        if (!fields["task_date"]) {
          formIsValid = false;
          errors["task_date"] = "Select date";
        }

        if (!fields["task_time"]) {
            formIsValid = false;
            errors["task_time"] = "Select time";
        }
    
        this.setState({
          errors: errors,
        });
        return formIsValid;
    }

    render(){
        const { assignedUsers } = this.props;
        const { fields, loading, update } = this.state;
        let assignedUsersDetails = assignedUsers.map(user => {
            return(
                <option key={user.id} value={user.id} >{user.name}</option>
            )
        })
        return(
            <div className="task_form_container">
                <div className="task_form">
                    <div className="task_form_group">
                        <label htmlFor="task_msg" className="task_form_label">Task description</label>
                        <input defaultValue={fields.task_msg} disabled={loading} onChange={this.handleChange} id="task_msg" name="task_msg" type="text" className="task_form_input" />
                        <div className="icon_r">
                            <span  className="iconify icon" data-icon="charm:notes"></span>
                        </div>
                    </div>
                    <div className="task_form_col_2">
                        <div className="task_form_group">
                            <label htmlFor="task_date" className="task_form_label">Date</label>
                            {/* <input onChange={this.handleChange} id="task_date" name="task_date" type="date" className="task_form_input input_pad" /> */}
                            <ReactDatePicker 
                            disabled={loading}
                            selected={fields.date} 
                            id="task_date" name="task_date" 
                            className="task_form_input input_pad" 
                            onChange={this.handleDate} />
                            <div className="icon_l">
                                <span  className="iconify icon" data-icon="fontisto:date"></span>
                            </div>
                        </div>
                        <div className="task_form_group">
                            <label htmlFor="task_time" className="task_form_label">Time</label>
                            {/* <input onChange={this.handleChange} id="task_time" name="task_time" type="time" className="task_form_input input_pad" /> */}
                            <ReactDatePicker
                            disabled={loading}
                            selected={fields.time}
                            onChange={this.handleTime}
                            className="task_form_input input_pad"
                            showTimeSelect
                            id="task_time" name="task_time"
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            placeholderText="Time"
                            dateFormat="h:mm aa"
                            />
                            <div className="icon_l">
                                <span  className="iconify icon" data-icon="wi:time-4"></span>
                            </div>
                        </div>
                    </div>
                    <div className="task_form_group">
                        <label htmlFor="assigned_user" className="task_form_label">Assign user</label>
                        <select 
                        disabled={loading}
                        onChange={this.handleChange} 
                        defaultValue={fields.assigned_user}
                        value={fields.assigned_user}
                        id="assigned_user" name="assigned_user" type="text" 
                        className="task_form_input select_input" 
                        >
                            <option>Select assigned user</option>
                            {assignedUsersDetails}
                        </select>
                        <div className="icon_r">
                            <span  className="iconify icon" data-icon="fluent:arrow-bidirectional-up-down-12-filled"></span>
                        </div>
                    </div>
                    <div className="task_form_bottom">
                        <div>
                        {update &&
                        <div onClick={this.deleteTask} className="delete_task">
                            <span  className="iconify icon" data-icon="ep:delete"></span>
                        </div>
                        }
                        </div>
                        <button onClick={this.props.close} disabled={loading} className="task_cancel_button">Cancel</button>
                        <button onClick={update ? this.updateTask : this.addTask} className={ (loading && "disabled") + " " + "task_save_button"} disabled={loading} >Save</button>
                    </div>
                </div>
            </div>
        )
    }
}

const TaskForm = connect(
    null,
    mapDispatchToProps
  )(ConnectedTask);
  
  export default TaskForm;