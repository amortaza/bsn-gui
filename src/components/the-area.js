import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

// import { Button } from 'react-bootstrap'

import ListView from '../features/list-view/list-view'

import { selector as appSelector, gotoDictionary } from '../app/slice'
// import { getAlertTitleUtilityClass } from '@mui/material'

const TheArea = () => {
    const appState = useSelector( appSelector )
    const dispatch = useDispatch()

    const [pageData, setPageData] = useState({header:[], rows:[]})
    
    useEffect( ()=> {

        if (!appState.focusPage) return
        
        axios.get( 'http://localhost:8000/table/x_schema/3d7380342fa24a889e6b7d798b826e37' )
            .then( (res) => {

                setPageData( parseResult(res) )

                function parseResult(res) { 
                    var header = [];
                    var rows = [];

                    for(var k in res.data) {
                        header.push(k)
                    }

                    for(var i = 0; i < 3; i++) {
                        var row = {...res.data}
                        rows.push(row)
                    }

                    return {header, rows}
                }
            } )
            .catch( (err) => {
                console.log(err);  
            })
    }, [appState.focusPage])

    return (
        <>
        {/* {appState.focusPage} */}
        {/* {pageData.header.length} */}
        <ListView headers={pageData.header} recs={pageData.rows} />
        </>
    )
}

export default TheArea