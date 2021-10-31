/* eslint-disable */
import axios from 'axios'
import {appMsg} from '../app/slice'

// cb( fields [] {name, type, label, schema_type} ) api_getTableFields.v2
const api_getTableFields = (table, dispatch, cb) => {

    axios.get( `http://localhost:8000/schema/${table}` )
    .then( (res) => {
        const data = res.data
        const fields = []

        if (data.length == 0) {
            cb( fields );
        }

        for (let i = 0; i < data.length; i++) {
            var field = data[ i ]
            fields.push( { name: field.x_field, type: field.x_field_type, label: field.x_label, schema_type: field.x_type } )
        }

        cb( fields )
    } )
    .catch( (err) => {
        const msg = `failed to get table fields for "${table}", see console for more details`
        console.log('****************** ' + msg)
        console.log('****************** ' + err)
        appMsg("error", msg, dispatch)
    })
}

export default api_getTableFields