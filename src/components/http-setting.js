import axios from "axios";

export const axiosClient = axios.create({
  baseURL: `http://localhost:3000/api`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjIxNjMyMDksIm5iZiI6MTY2MjE2MzIwOSwianRpIjoiMzkyMGY3NDEtZmNhZC00YmM2LWE4MGMtYjBkYjVlMTY2YTEwIiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1bmRhciBQaWNoYWkiLCJlbWFpbCI6InNtaXRod2lsbHMxOTg5QGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzRlZTRjZjY3YWQ0NzRhMjc5ODhiYzBhZmI4NGNmNDcyIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9jZjk0Yjc0YmQ0MWI0NjZiYjE4NWJkNGQ2NzRmMDMyYj9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.3ZdOwPIiAVQMBv4QoITBmlU_ZiVbwr2B-IRNc0L3iwM',
    'access-control-allow-origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With'
  }
});
// export default axiosClientt;
