/* eslint-disable */
import axios from 'axios'

const api_getTableByQuery = (table, pageIndex, pageSize, cb) => {

    axios.get( `http://localhost:8000/table/${table}?index=${pageIndex}&size=${pageSize}` )
    .then( (res) => {
        const header = []
        const rows = []
        const data = res.data

        if (data.length == 0) {
            cb( header, rows );
        }

        for (let k in data[ 0 ]) {
            header.push(k)
        }

        for (let i = 0; i < data.length; i++) {
            var row = {...data[ i ]}
            rows.push(row)
        }

        cb( header, rows )
    } )
    .catch( (err) => {
        alert(err)
        console.log(err);  
        // todo dialog
    })
}

export default api_getTableByQuery