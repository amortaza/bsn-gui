/* eslint-disable */
import {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'

import { useParams } from 'react-router'

import api_getTableById from '../api/get_table_by_id'

import FormView from './form-view'

/*
params.table
params.id (can be 'new')
*/
export default function UrlFormView (props) {
    let { table, id } = useParams()
    
    const [recordData, setRecordData] = useState( {} ) 

    const dispatch = useDispatch()

    useEffect( () => {

        if (id == 'new') return

        // cb( { ...record } ).v1
        api_getTableById( table, id, dispatch, (record) => {
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
