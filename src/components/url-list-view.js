/* eslint-disable */
import React, {useEffect, useState} from 'react'

import { useParams } from 'react-router'
import api_getTableByQuery from '../api/get_table_by_query'

import ListView from './list-view'

/*
params.table
*/

const UrlListView = () => {

    let { table } = useParams()

    const [recs, setRecs] = useState( [] )
    const [totalCount, setTotalCount] = useState( 0 )

    const [pageIndex, setPageIndex] = useState(0)
    const [pageSize, setPageSize] = useState(5)

    function setListPagination(index, size) {
        setPageIndex( index )
        setPageSize( size )
    }

    useEffect( () => {

        // table, pageIndex, pageSize, cb( rows, totalCount ).v1
        api_getTableByQuery( table, pageIndex, pageSize, (rows, total) => {  
            //console.log('****************** ' + pageIndex + ' ' + pageSize + ' / ' + JSON.stringify(rows))          
            setRecs( rows )
            setTotalCount(total)
        })

    }, [ table, pageIndex, pageSize ] )

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