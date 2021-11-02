/* eslint-disable */
import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import queryString from 'query-string'
import { useParams } from 'react-router'
import { useLocation } from 'react-router-dom'
import api_getRowsByQuery from '../api/get_rows_by_query'

import ListView from './list-view'

/*
props.table

*/

const UrlListView = (props) => {
    const location = useLocation()    

    let { table } = useParams()

    const [recs, setRecs] = useState( [] )
    const [totalCount, setTotalCount] = useState( 0 )

    const [pageIndex, setPageIndex] = useState(0)
    const [pageSize, setPageSize] = useState(5) 

    // const [query, setQuery] = useState('')

    const dispatch = useDispatch()

    function setListPagination(index, size) {
        setPageIndex( index )
        setPageSize( size )
    }

    useEffect( () => {

        let t = queryString.parse(location.search)
        
        // t.query can be undefined...hence the empty string
        const query = t.query || ''

        // table, pageIndex, pageSize, dispatch, cb( rows, totalCount ), filter, query.v3.api_getRowsByQuery
        api_getRowsByQuery( 
            table, 
            pageIndex, pageSize, 
            dispatch, 
            (rows, total) => {  
                //console.log('****************** ' + pageIndex + ' ' + pageSize + ' / ' + JSON.stringify(rows))          
                setRecs( rows )
                setTotalCount(total)
            },
            null,
            query
        )

    }, [ table, pageIndex, pageSize, location.search ] )

    return (
        <ListView 
            table={table} 
            recs={recs} 
            total={totalCount}
            setListPagination={setListPagination}
        />
    )
}

export default UrlListView