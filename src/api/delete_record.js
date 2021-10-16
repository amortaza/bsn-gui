/* eslint-disable */
import axios from 'axios'

// cb()
const api_deleteRecord = (table, xid, cb) => {

    axios.delete( `http://localhost:8000/table/${table}/id/${xid}` )
    .then( (res) => {
        cb()
    } )
    .catch( (err) => {
        alert('ERROR api_deleteRecord ' + err)
        console.log(err);  
        // todo dialog
    })
}

export default api_deleteRecord