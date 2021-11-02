/* eslint-disable */
import axios from 'axios'
import {appMsg} from '../app/slice'

// table, pageIndex, pageSize, dispatch, cb( rows, totalCount ), filter, query.v3.api_getRowsByQuery
export default function api_getRowsByQuery(
    table, 
    pageIndex, pageSize, 
    dispatch, 
    cb, 
    filter,
    query ) {

    axios.get( `http://localhost:8000/table/${table}?index=${pageIndex}&size=${pageSize}&query=${query}` )
    .then( (res) => {
        let data = res.data

        if (data.length == 0) {            
            cb( [] );
        }

        if (filter) {
            data = data.filter( filter )
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

