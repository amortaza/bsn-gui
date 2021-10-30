/* eslint-disable */
import axios from 'axios'

// cb( { ...record } ).v1
const api_getTableById = (table, id, cb) => {

    axios.get( `http://localhost:8000/table/${table}/${id}` )
    .then( (res) => {
        if (res.status != 200) {
            alert('api_getTableById ' + res.status)
            console.log('****************** ' + res)
        } else {
            cb( res.data )
        }
    } )
    .catch( (err) => {
        alert(err)
        console.log(err);  
        // todo dialog
    })
}

export default api_getTableById