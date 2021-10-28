import React from 'react'
import {useState} from 'react'
import Button from '@mui/material/Button'

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { useSelector, useDispatch } from 'react-redux'
import {useEffect} from 'react'

  /*
  props.setListPagination( pageIndex, pageSize )
  props.total
  */
const Pagination = (props) => {
    const [pageIndex, setPageIndex] = useState( 1 )
    const [pageSize, setPageSize] = useState( 2 )    

    const dispatch = useDispatch()

    function nextPage() {
        setPageIndex( pageIndex + 1 )
    }
    
    function prevPage() {
        setPageIndex( Math.max( 1, pageIndex - 1 ) )
    }

    useEffect(() => {
        props.setListPagination( pageIndex, pageSize )
        
    }, [pageIndex])

    let maxPageIndex = Math.ceil( props.total / pageSize )
    let label = pageIndex + ' of ' + maxPageIndex

    return (
        <Stack direction="row" spacing={1} style={{marginTop:"1em", marginBottom:"2em"}}>

            <Button variant="contained" disabled={pageIndex==1} onClick={prevPage}>Previous</Button>   

            <Chip label={label} variant="filled" style={{marginTop:"0.3em", marginLeft:"1em", marginRight:"1em"}}/>

            <Button variant="contained" disabled={pageIndex >= maxPageIndex} onClick={nextPage}>Next</Button>   

        </Stack>
    )
}

export default Pagination