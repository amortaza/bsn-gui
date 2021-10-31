/* eslint-disable */
import axios from 'axios'
import {appMsg} from '../app/slice'

// table, pageIndex, pageSize, cb( rows, totalCount ).v1
const api_getTableByQuery = (table, pageIndex, pageSize, dispatch, cb) => {
    
    axios.get( `http://localhost:8000/table/${table}?index=${pageIndex}&size=${pageSize}` )
    .then( (res) => {
        const data = res.data

        if (data.length == 0) {
            cb( [] );
        }

        cb( data, parseInt( res.headers['x-total-count'], 10 ) )
    } )
    .catch( (err) => {
        const msg = `failed to get records from table "${table}", see console for more details`
        console.log('****************** ' + msg)
        console.log('****************** ' + err)
        appMsg("error", msg, dispatch)
    })
}

export default api_getTableByQuery