/* eslint-disable */
import React, {useEffect, useState} from 'react'

import { useParams } from 'react-router'
import api_getTableById from '../api/get_table_by_id'

import Form from './form-view'

/*
props.table
props.tableLabel
props.formData
props.isUpdateForm
*/
const UrlFormView = (props) => {
    let { table, id } = useParams()
    
    const [recordData, setRecordData] = useState( {} ) 

    useEffect( () => {

        // cb( { ...record } ).v1
        api_getTableById( table, id, (record) => {
            // alert(JSON.stringify(record));
            setRecordData( record )
        })
    }, [ table, id ] )

    return (
        <Form 
            table={table} 
            tableLabel={'Todo'} 
            formData={recordData} 
            isUpdateForm={true}
        />
    )
}

export default UrlFormView