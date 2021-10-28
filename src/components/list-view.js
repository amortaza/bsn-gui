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
import api_getTableFields from '../api/get_table_fields'

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
    props.tableLabel
    props.headers
    props.recs

    props.pageSize
    props.pageIndex

    props.total

    props.setListPagination( index, size )
  */
const ListView = (props) => {
    // console.log('******************** ListView ' + JSON.stringify(props));
    const [recs, setRecs] = useState( props.recs )

    // headerDefs = [ {field, label} ... ]
    const [headerDefs, setHeaderDefs] = useState( [] )

    const dispatch = useDispatch()

    useEffect(() => {

      // cb( fields [] {name, type, label} ) api_getTableFields.v1
      
      if (!props.table) return;

      console.log('ListView calling api_getTableFields for table ' + props.table);

      api_getTableFields( props.table, (fields) => {
        setHeaderDefs( fields.map(( {name, label}) => {
          return {field: name, label }
        }))  

        setRecs(props.recs)
      })
    }, [props.table])

    function gotoUpdateFormView( table, tableLabel, recordId ) {
      dispatch(gotoUpdateFormView_action( { table, tableLabel, recordId } ))
    }
    
    function gotoNewFormView( table, tableLabel ) {
      dispatch(gotoNewFormView_action( { table, tableLabel } ))
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
        <h3>{props.tableLabel} ( {props.table} )</h3>

        <Button style={{marginTop:"1em", marginBottom:"2em"}} variant="contained" onClick={() => {
            gotoNewFormView( props.table, props.tableLabel )
        }}>New</Button>   

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">

              <TableHead>
                <TableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>

                  {headerDefs.map( (headerDef) => (
                    <StyledTableCell>{headerDef.label}</StyledTableCell>
                  ) ) }
                </TableRow>
              </TableHead>

              <TableBody>

                {recs.map((row) => (
                    
                  <StyledTableRow key={row.Table}>

                    <StyledTableCell>
                      <Button variant="outlined" size="small" color="primary" onClick={() => {
                          gotoUpdateFormView( props.table, props.tableLabel, row.x_id )
                      }}>Edit</Button>   

                    </StyledTableCell>

                    <StyledTableCell>
                      <Button variant="outlined" size="small" color="error" onClick={() => {
                          deleteRecord(props.table, row.x_id)
                      }}>Delete</Button>   

                    </StyledTableCell>

                    {headerDefs.map( (headerDef) => (
                      <StyledTableCell>{row[ headerDef.field ] + ''}</StyledTableCell>
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