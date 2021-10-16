/* eslint-disable */
import axios from 'axios'

// cb()
const api_deleteField = (table, field, cb) => {

    axios.delete( `http://localhost:8000/schema/table/${table}/field/${field}` )
    .then( (res) => {
        cb()
    } )
    .catch( (err) => {
        alert('ERROR api_getTableFields ' + err)
        console.log(err);  
        // todo dialog
    })
}

export default api_deleteField