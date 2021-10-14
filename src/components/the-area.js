import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

// import { Button } from 'react-bootstrap'

import ListView from './list-view/list-view'
import Form from './form/form-view'

import { selector as appSelector } from '../app/slice'

const TheArea = () => {
    const appState = useSelector( appSelector )
    const dispatch = useDispatch()

    const [pageData_listView, setPageData_listView] = useState({header:[], rows: [] })
    const [pageData_formView, setPageData_formView] = useState({ table:'none', formData: {} })

    // listView
    useEffect( ()=> {
        if (!appState.focusPage) return
        if ( appState.focusPage.type != 'listView') return

        const page = appState.focusPage
        
        axios.get( 'http://localhost:8000/table/' + page.table )
            .then( (res) => {
                setPageData_listView( parseResult(res.data) )

                function parseResult(data) { 
                    var header = [];
                    var rows = [];

                    console.log('data ******************** ' + JSON.stringify(data));

                    if (data.length == 0) {
                        return { header, rows };
                    }

                    for(var k in data[ 0 ]) {
                        header.push(k)
                    }

                    for(var i = 0; i < data.length; i++) {
                        var row = {...data[ i ]}
                        rows.push(row)
                    }

                    return {header, rows}
                }
            } )
            .catch( (err) => {
                console.log(err);  
            })
    }, [appState.focusPage] )

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
                // alert(JSON.stringify(res.data));
                setPageData_formView( {
                    table: page.table,
                    formData: buildFormData(res.data)
                } )
            } )
            .catch(console.log)


    }, [appState.focusPage] )

    let component
    
    if ( appState.focusPage.type == 'listView') {
        component = <ListView headers={pageData_listView.header} recs={pageData_listView.rows} />
    } else if ( appState.focusPage.type == 'updateFormView') { 
        component = <Form table={pageData_formView.table} formData={pageData_formView.formData} />
    } else if ( appState.focusPage.type == 'newFormView') { 
        component = <Form table={pageData_formView.table} formData={pageData_formView.formData} />
    } else {
        component = <div>You are drunk! go home</div>
    }

    return (
        <>
            {component}
        </>
    )
}

export default TheArea