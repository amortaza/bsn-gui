/* eslint-disable */
import axios from 'axios'

// cb( fields [] {name, type} )
const api_getTableFields = (table, cb) => {

    axios.get( `http://localhost:8000/schema/${table}` )
    .then( (res) => {
        const data = res.data
        const fields = []

        if (data.length == 0) {
            cb( fields );
        }

        for (let i = 0; i < data.length; i++) {
            var field = data[ i ]
            fields.push( { name: field.x_field, type: field.x_field_type, label: field.x_label } )
        }

        cb( fields )
    } )
    .catch( (err) => {
        alert('ERROR api_getTableFields ' + err)
        console.log(err);  
        // todo dialog
    })
}

export default api_getTableFields