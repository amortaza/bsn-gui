/* eslint-disable */
import axios from 'axios'
import {appMsg} from '../app/slice'

// cb()
const api_deleteField = (table, field, dispatch, cb ) => {

    axios.delete( `http://localhost:8000/schema/table/${table}/field/${field}` )
    .then( (res) => {
        cb()
    } )
    .catch( (err) => {
        console.log('****************** ' + err)
        dispatch("error", 'ERROR api_getTableFields ' + err, dispatch)
    })
}

export default api_deleteField