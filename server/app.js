const axios = require('axios');
const express = require('express');
const app = express();
// const cors = require('cors');
const path = require('path');
const { axiosClient } = require('./http-setting');

// app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'build')));

const url = 'https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691'

app.get('/teams', (req, res) => {
  axiosClient.get('https://stage.api.sloovi.com/team?product=outreach&company_id=company_413ef22b6237417fb1fba7917f0f69e7')
  .then(response => {
    res.send(response.data)
  }).catch(err => {console.log(err.message)})
})

app.get('/tasks', (req, res) => {
      axiosClient.get(url+'?company_id=company_413ef22b6237417fb1fba7917f0f69e7')
      .then(response => {
        res.send(response.data)
      }).catch(err => {console.log(err.message)})
})

app.post('/task', (req, res) => {
  let { fields } = req.body;
  
  axiosClient.post(url+'?company_id=company_413ef22b6237417fb1fba7917f0f69e7',
  {
    assigned_user:  fields.assigned_user, 
    task_date: fields.task_date,
    task_time: fields.task_time ,
    is_completed: fields.is_completed,
    time_zone: fields.task_time - fields.time_zone,
    task_msg: fields.task_msg
  })
  .then(response => {
    res.send(response.data)
  }).catch(({request}) => {
    res.send(request)
  })
})

app.put('/task', (req, res) => {
  let { fields, taskId } = req.body

  axiosClient.put(url+'/'+ taskId + '?company_id=company_413ef22b6237417fb1fba7917f0f69e7',
  {
    assigned_user:  fields.assigned_user, 
    task_date: fields.task_date,
    task_time: fields.task_time ,
    is_completed: fields.is_completed,
    time_zone: fields.task_time - fields.time_zone,
    task_msg: fields.task_msg
  }).then(response => {
    res.send(response.data)
  }).catch(({request}) => {
    res.send(request)
  })
})

app.delete('/task', (req, res) => {
  let { taskId } = req.params;

  axiosClient.delete(url+'/'+ taskId + '?company_id=company_413ef22b6237417fb1fba7917f0f69e7')
  .then(response => {
    res.send(response.data)
  }).catch(({request}) => {
    res.send(request)
  })
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
})

const port = process.env.PORT || 5000

app.listen(port, ()=> console.log(`listing to ${port}`))
