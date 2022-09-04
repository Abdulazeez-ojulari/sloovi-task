const axios = require('axios');

module.exports.axiosClient = axios.create({
  baseURL: `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjIxNjMyMDksIm5iZiI6MTY2MjE2MzIwOSwianRpIjoiMzkyMGY3NDEtZmNhZC00YmM2LWE4MGMtYjBkYjVlMTY2YTEwIiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1bmRhciBQaWNoYWkiLCJlbWFpbCI6InNtaXRod2lsbHMxOTg5QGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzRlZTRjZjY3YWQ0NzRhMjc5ODhiYzBhZmI4NGNmNDcyIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9jZjk0Yjc0YmQ0MWI0NjZiYjE4NWJkNGQ2NzRmMDMyYj9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.3ZdOwPIiAVQMBv4QoITBmlU_ZiVbwr2B-IRNc0L3iwM',
    'Access-Control-Allow-Origin': '*'
  }
});

module.exports.paystackClient = axios.create({
  baseURL: `https://api.paystack.co/transaction`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer sk_test_3de898aa3e18d22f446825eb0be3b693da76bb80'
  }
})
// export default axiosClientt;


