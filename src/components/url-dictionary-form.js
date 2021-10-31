/* eslint-disable */
import { useEffect } from 'react'
import { useParams } from 'react-router'
import DictionaryForm from './dictionary-form'

/*
params.table

props.action new/update
*/
const UrlDictionaryForm = ( props ) => {

    let component

    if (props.action == 'new') {
        component = <DictionaryForm action='create' />
    } else {
        const { table } = useParams() 

        component = <DictionaryForm table={table} action='update'  />
    }

    return (
        <>
        {component}    
        </>
    )
}

export default UrlDictionaryForm