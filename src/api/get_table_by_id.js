/* eslint-disable */
import axios from 'axios'
import {appMsg} from '../app/slice'

// cb( { ...record } ).v1.api_getTableById
const api_getTableById = (table, id, dispatch, cb) => {

    axios.get( `http://localhost:8000/table/${table}/${id}` )
    .then( (res) => {
        cb( res.data )
    } )
    .catch( (err) => {
        const msg = `failed to get record from "${table}", see console for more details`
        console.log('****************** ' + msg)
        console.log('****************** ' + err)
        appMsg("error", msg, dispatch)
    })
}

export default api_getTableById