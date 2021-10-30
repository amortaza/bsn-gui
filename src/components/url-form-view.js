/* eslint-disable */
import React, {useEffect, useState} from 'react'

import { useParams } from 'react-router'

import api_getTableById from '../api/get_table_by_id'

import FormView from './form-view'

/*
params.table
params.id (can be 'new')
*/
const UrlFormView = (props) => {
    let { table, id } = useParams()
    
    const [recordData, setRecordData] = useState( {} ) 

    useEffect( () => {

        if (id == 'new') return

        // cb( { ...record } ).v1
        api_getTableById( table, id, (record) => {
            setRecordData( record )
        })

    }, [ table, id ] )

    return (
        <FormView
            table={table} 
            id={id}
            formData={recordData} 
        />
    )
}

export default UrlFormView