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
        const orderBy = t.order_by || ''
        const orderByDesc = t.order_by_desc || ''

        // table, pageIndex, pageSize, dispatch, cb( rows, totalCount ), filter, query, orderBy, orderByDesc.v4.api_getRowsByQuery
        api_getRowsByQuery( 
            table, 
            pageIndex, pageSize, 
            dispatch, 
            (rows, total) => {  
                setRecs( rows )
                setTotalCount(total)
            },
            null,
            query,
            orderBy,
            orderByDesc
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