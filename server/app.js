const axios = require('axios');
const express = require('express');
const app = express();
// const cors = require('cors');
const path = require('path');
const { axiosClient } = require('./http-setting');

// app.use(cors(corsOption));

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/teams', (req, res) => {
  axiosClient.get('https://stage.api.sloovi.com/team?product=outreach&company_id=company_413ef22b6237417fb1fba7917f0f69e7')
  .then(response => {
    res.send(response.data)
  }).catch(err => {console.log(err.message)})
})

app.get('/tasks', (req, res) => {
      axiosClient.get('?company_id=company_413ef22b6237417fb1fba7917f0f69e7')
      .then(response => {
        res.send(response.data)
      }).catch(err => {console.log(err.message)})
})

app.post('/task', (req, res) => {
  let { fields } = req.body;
  
  axiosClient.post('?company_id=company_413ef22b6237417fb1fba7917f0f69e7',
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

  axiosClient.put('/'+ taskId + '?company_id=company_413ef22b6237417fb1fba7917f0f69e7',
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

  axiosClient.delete('/'+ taskId + '?company_id=company_413ef22b6237417fb1fba7917f0f69e7')
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
