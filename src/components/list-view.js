import React, { useEffect } from 'react'
import {useState} from 'react'
import Button from '@mui/material/Button'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import { useDispatch } from 'react-redux'

import { gotoUpdateFormView as gotoUpdateFormView_action } from '../app/slice'
import { gotoNewFormView as gotoNewFormView_action } from '../app/slice'

import Pagination from './pagination'

import api_deleteRecord from 'src/api/delete_record';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  /*
    props.table
    props.headers
    props.recs

    props.pageSize
    props.pageIndex

    props.total

    props.setListPagination( index, size )
  */
const ListView = (props) => {
    const [recs, setRecs] = useState( props.recs )

    const dispatch = useDispatch()

    let headers = props.headers;

    useEffect(() => {
      setRecs(props.recs)
    }, [props.recs])


    function gotoUpdateFormView( table, recordId ) {
      dispatch(gotoUpdateFormView_action( { table, recordId } ))
    }
    
    function gotoNewFormView( table ) {
      dispatch(gotoNewFormView_action( { table } ))
    }

    function deleteRecord(table, xid) { 
      api_deleteRecord(table, xid, () => {
        
        let newRecs = recs.filter( (rec) => {
          return rec.x_id != xid;
        })

        setRecs( newRecs )
      })
    }

    function setListPagination(pageIndex, pageSize) {
      props.setListPagination(pageIndex, pageSize)      
    }

    return (
      <>
        <Button style={{marginTop:"1em", marginBottom:"2em", marginLeft:"1em"}} variant="contained" onClick={() => {
            gotoNewFormView( props.table )
        }}>New</Button>   

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">

              <TableHead>
                <TableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>

                  {headers.map( (header) => (
                    <StyledTableCell>{header}</StyledTableCell>
                  ) ) }
                </TableRow>
              </TableHead>

              <TableBody>

                {recs.map((row) => (
                    
                  <StyledTableRow key={row.Table}>

                    <StyledTableCell>
                      <Button variant="outlined" size="small" color="primary" onClick={() => {
                          gotoUpdateFormView( props.table, row.x_id )
                      }}>Edit</Button>   

                    </StyledTableCell>

                    <StyledTableCell>
                      <Button variant="outlined" size="small" color="error" onClick={() => {
                          deleteRecord(props.table, row.x_id)
                      }}>Delete</Button>   

                    </StyledTableCell>

                    {headers.map( (header) => (
                      <StyledTableCell>{row[ header ] + ''}</StyledTableCell>
                    ) ) }

                  </StyledTableRow>
                ))}
              </TableBody>

            </Table>

        </TableContainer>

        <Pagination setListPagination={setListPagination} total={props.total} />
      </>
    )
}

export default ListView