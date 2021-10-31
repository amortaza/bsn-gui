/* eslint-disable */
import axios from 'axios'
import {appMsg} from '../app/slice'

// cb().v1.api_deleteField
const api_deleteField = (table, field, dispatch, cb ) => {

    axios.delete( `http://localhost:8000/schema/table/${table}/field/${field}` )
    .then( (res) => {
         const msg = `deleted field "${field}"`
         appMsg("success", msg, dispatch)
         
         cb()
    } )
    .catch( (err) => {
        const msg = `failed to delete field "${field}", see console for more details`
        console.log('****************** ' + msg)
        console.log('****************** ' + err)
        appMsg("error", msg, dispatch)
    })
}

export default api_deleteField