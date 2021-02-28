import axios from 'axios'

console.log("running")
let data = JSON.stringify({
  login: 'admin',
  password: 'randompass'
})

axios.post('http://localhost:5000/api/v1/jwt/issue', data, {
  headers: {
    'Content-Type': 'application/json',
  }
})
.then(response => {
  console.log(response.data)
  return response.data
})
.catch(error => {
  console.log(error)
  // this.errored = true
})
// .finally(() => this.loading = false)
