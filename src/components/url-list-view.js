/* eslint-disable */
import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import queryString from 'query-string'
import { useParams } from 'react-router'
import { useLocation } from 'react-router-dom'
import api_getRowsByQuery from '../api/get_rows_by_query'

import ListView from './list-view'
import { Chip } from '@mui/material'

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
    const [query, setQuery] = useState('') 
    const [orderBy, setOrderBy] = useState('') 
    const [orderByDesc, setOrderByDesc] = useState('') 

    const dispatch = useDispatch()

    function setListPagination(index, size) {
        setPageIndex( index )
        setPageSize( size )
    }

    function setFilterQuery(query) {
        setQuery(query)
    }

    function setOrdering( orderBy, desc) {
        setOrderBy('')
        setOrderByDesc('')

        if (desc) {
            setOrderByDesc(orderBy)
        } else {
            setOrderBy(orderBy)
        }
    }

    useEffect( () => {

        let t = queryString.parse(location.search)

        if ('query' in t) {
            setQuery(t.query || '')
        }
        
        if ('order_by' in t) {
            setOrderBy(t.order_by || '')

            if (t.order_by) {
                setOrderByDesc('')
            }
        }

        if ('order_by_desc' in t) {
            setOrderByDesc(t.order_by_desc || '')

            if (t.order_by_desc) {
                setOrderBy('')
            }
        }

        if ('index' in t) {
            const pageIndex = t.index || ''

            let index = parseInt(pageIndex, 10)
            if (isNaN(index)) {
                index = 0
            }

            setPageIndex( index )
        }

        if ('size' in t) {
            const pageSize = t.size || ''

            let size = parseInt(pageSize, 10)
            if (isNaN(size)) {
                size = 0
            }

            setPageSize( size )
        }

    }, [ location.search ] )

    useEffect( () => {

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

    }, [ table, pageIndex, pageSize, query, orderBy, orderByDesc ] )

    return (
        <>
        <ListView 
            table={table} 
            recs={recs} 
            total={totalCount}
            setListPagination={setListPagination}
            pageIndex={pageIndex}
            pageSize={pageSize}
            query={query}
            orderBy={orderBy}
            orderByDesc={orderByDesc}
        />
        </>
    )
}

export default UrlListView