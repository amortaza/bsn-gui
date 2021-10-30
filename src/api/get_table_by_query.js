/* eslint-disable */
import axios from 'axios'

// table, pageIndex, pageSize, cb( rows, totalCount ).v1
const api_getTableByQuery = (table, pageIndex, pageSize, cb) => {
    
    axios.get( `http://localhost:8000/table/${table}?index=${pageIndex}&size=${pageSize}` )
    .then( (res) => {
        const data = res.data

        if (data.length == 0) {
            cb( [] );
        }

        cb( data, parseInt( res.headers['x-total-count'], 10 ) )
    } )
    .catch( (err) => {
        alert(err)
        console.log(err);  
        // todo dialog
    })
}

export default api_getTableByQuery