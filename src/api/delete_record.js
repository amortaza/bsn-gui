/* eslint-disable */
import axios from 'axios'
import {appMsg} from '../app/slice'

// cb()
const api_deleteRecord = (table, xid, dispatch, cb) => {

    axios.delete( `http://localhost:8000/table/${table}/id/${xid}` )
    .then( (res) => {
        const msg = `deleted record`
        appMsg("success", msg, dispatch)

        cb()
    } )
    .catch( (err) => {
        const msg = `failed to delete record, see console for more details`
        console.log('****************** ' + msg)
        console.log('****************** ' + err)
        appMsg("error", msg, dispatch)
    })
}

export default api_deleteRecord