/* eslint-disable */
import axios from 'axios'
import {appMsg} from '../app/slice'

// table, pageIndex, pageSize, dispatch, cb( rows, totalCount ), filter, query, orderBy, orderByDesc.v4.api_getRowsByQuery
export default function api_getRowsByQuery(
    table, 
    pageIndex, pageSize, 
    dispatch, 
    cb, 
    filter,
    query,
    orderBy,
    orderByDesc ) {

    // we dont want 'undefined' appearing everywhere, now do we?    
    query = query || ''
    orderBy = orderBy || ''
    orderByDesc = orderByDesc || ''

    axios.get( `http://localhost:8000/table/${table}?index=${pageIndex}&size=${pageSize}&query=${query}&order_by=${orderBy}&order_by_desc=${orderByDesc}` )
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

