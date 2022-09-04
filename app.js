const axios = require('axios');
const express = require('express');
const app = express();
const cors = require('cors');

var corsOption = {
    origin: ["http://localhost:3001", "https://glacial-brook-33351.herokuapp.com", "http://localhost:3000", "http://localhost:3002", "http://localhost:3003"]
};

app.use(cors(corsOption));

const port = process.env.PORT || 5000

app.listen(port, ()=> console.log(`listing to ${port}`))

app.get('/tasks', (req, res) => {
    axios({
        url: 'https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=company_413ef22b6237417fb1fba7917f0f69e7',
        method: 'get',
          headers: {
            'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjIxNjMyMDksIm5iZiI6MTY2MjE2MzIwOSwianRpIjoiMzkyMGY3NDEtZmNhZC00YmM2LWE4MGMtYjBkYjVlMTY2YTEwIiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1bmRhciBQaWNoYWkiLCJlbWFpbCI6InNtaXRod2lsbHMxOTg5QGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzRlZTRjZjY3YWQ0NzRhMjc5ODhiYzBhZmI4NGNmNDcyIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9jZjk0Yjc0YmQ0MWI0NjZiYjE4NWJkNGQ2NzRmMDMyYj9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.3ZdOwPIiAVQMBv4QoITBmlU_ZiVbwr2B-IRNc0L3iwM',
        }
      }).then(response => {
        res.send(response.data)
      }).catch(err => {console.log(err.message)})
})