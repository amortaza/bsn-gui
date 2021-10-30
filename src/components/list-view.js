/* eslint-disable */

import React, { useEffect } from 'react'
import {useState} from 'react'
import Button from '@mui/material/Button'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

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
    props.recs

    props.pageIndex
    props.pageSize

    props.total

    props.setListPagination( index, size )
  */
const ListView = (props) => {

    const [tableLabel, setTableLabel] = useState( 'Unknown' )
    
    // const [pagination_pageIndex, setPagination_pageIndex] = useState( 0 )
    // const [pagination_pageSize, setPagination_pageSize] = useState( 5 )

    // const [gridRows, setGridRows] = useState( [] )

    // headerDefs = [ {field, label} ... ].v1
    const [headerDefs, setHeaderDefs] = useState( [] )
    // const [gridCols, setGridCols] = useState( [] )

    const dispatch = useDispatch()

    // set headerdefs
    useEffect(() => {

      if (!props.table) return

      // cb( fields [] {name, type, label, schema_type} ) api_getTableFields.v1
      api_getTableFields( props.table, (fields) => {
        
        for ( let i = 0; i < fields.length; i++) {
          if (fields[i].schema_type == 'relation') {            
            setTableLabel( fields[i].label )
            break
          }
        }

        fields = fields.filter( ({schema_type}) => {
          return schema_type != 'relation'
        })

        setHeaderDefs( fields.map(( {name, label}) => {
          return {field: name, label }
        }))  

      })
    }, [props.table])

    
    return (
      <>
        <h3>{tableLabel} ( {props.table} )</h3>

        <Button style={{marginTop:"1em", marginBottom:"2em"}} variant="contained" onClick={() => {
            // gotoNewFormView( props.table, props.tableLabel )
        }}>New {tableLabel}</Button>   

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

                {props.recs.map((row) => (
                    
                  <StyledTableRow key={row.Table}>

                    <StyledTableCell>
                      <Button variant="outlined" size="small" color="primary" onClick={() => {
                          // gotoUpdateFormView( props.table, props.tableLabel, row.x_id )
                      }}>Edit</Button>   

                    </StyledTableCell>

                    <StyledTableCell>
                      <Button variant="outlined" size="small" color="error" onClick={() => {
                          // deleteRecord(props.table, row.x_id)
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

        <Pagination setListPagination={props.setListPagination} total={props.total} />
      </>
    )
}

export default ListView