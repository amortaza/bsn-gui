/* eslint-disable */
import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check'


import axios from 'axios'

import DictionaryForm from './dictionary-form'
import DictionaryView from './dictionary-view'
import FormView from './form-view'
import ListView from './list-view'

import api_getTableByQuery from '../api/get_table_by_query'
import api_getTableFields from '../api/get_table_fields'

import { selector as appSelector } from '../app/slice'
import {historyRewind as historyRewind_action, appMsg} from '../app/slice'

const TheArea = () => {
    const appState = useSelector( appSelector )
    const dispatch = useDispatch()

    const [pageData_listView, setPageData_listView] = useState({table: '', tableLabel: '', header:[], rows: [], total: 0 })
    const [pageData_formView, setPageData_formView] = useState({ table:'none', formData: {} })

    // listView
    // useEffect( ()=> {
        
    //     if (!appState.focusPage) return
    //     if ( appState.focusPage.type != 'listView') return

    //     const page = appState.focusPage

    //     api_getTableByQuery(page.table, pageIndex * pageSize, pageSize, (rows, total) => {

    //         // each field will be { name, label }
    //         api_getTableFields(page.table, (fields) => {
    //             const header = fields.map((field) => {
    //                 return field.label
    //             })
    //             setPageData_listView( {table: page.table, tableLabel: page.tableLabel, header, rows, total} )
    //         })
    //     })
        
    // }, [appState.focusPage, pageIndex, pageSize] )

    // updateFormView
    useEffect( ()=> {
        if (!appState.focusPage) return
        if ( appState.focusPage.type != 'updateFormView') return
        if (!appState.focusPage.recordId) return

        const page = appState.focusPage
        
        axios.get( 'http://localhost:8000/table/' + page.table + '/' + page.recordId )
            .then( res => {                
                setPageData_formView( {
                    table: page.table,
                    formData: res.data
                } )
            } )
            .catch(console.log)

    }, [appState.focusPage] )

    // newFormView
    useEffect( ()=> {
        
        if (!appState.focusPage) return
        if ( appState.focusPage.type != 'newFormView') return
        
        const page = appState.focusPage
        
        const buildFormData = (schema) => {
            const form = {};
            
            for ( let i = 0; i < schema.length; i++) {
                const e = schema[ i ]

                form[ e.x_field ] = ""
            }

            return form
        }

        axios.get( 'http://localhost:8000/schema/' + page.table )
            .then( res => {                
                
                setPageData_formView( {
                    table: page.table,
                    formData: buildFormData(res.data)
                } )
            } )
            .catch(console.log)


    }, [appState.focusPage] )

    let component
    
    if ( appState.focusPage.type == 'dictionaryForm') {
        component = <DictionaryForm table={appState.focusPage.table} action={appState.focusPage.action} />

    } else if ( appState.focusPage.type == 'dictionaryView') {
        component = <DictionaryView />

    } else if ( appState.focusPage.type == 'listView') {
        component = <ListView table={pageData_listView.table} tableLabel={pageData_listView.tableLabel} recs={pageData_listView.rows} total={pageData_listView.total} setListPagination={setListPagination} />

    } else if ( appState.focusPage.type == 'updateFormView') { 
        component = <FormView table={pageData_formView.table} formData={pageData_formView.formData} />

    } else if ( appState.focusPage.type == 'newFormView') { 
        component = <FormView table={pageData_formView.table} formData={pageData_formView.formData} />

    } else {
        component = <div>You are drunk! go home</div>
    }

    let alertComponent

    if (appState.alert.msg) {
        alertComponent = <Alert 
            icon={<CheckIcon fontSize="inherit" />} 
            style={{marginBottom:"1em"}}
            severity={appState.alert.type}>

            {appState.alert.msg}
        </Alert>

        let timeout = {'error': 60000, 'warning':'60000', 'info':30000, 'success':15000}[ appState.alert.type ]
        setTimeout(() => {
            appMsg('info','',dispatch)
        }, timeout);
    }

    return (
        <div style={{padding:"1em"}}>

            {alertComponent}

            {component}
        </div>
    )
}

export default TheArea