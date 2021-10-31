/* eslint-disable */

import { useEffect } from 'react'
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
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import api_getTableFields from '../api/get_table_fields'

import Pagination from './pagination'

import api_deleteRecord from 'src/api/delete_record';
import { appMsg } from 'src/app/slice';

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
    const [recs, setRecs] = useState( props.recs || [] )
    
    // headerDefs = [ {field, label} ... ].v1
    const [headerDefs, setHeaderDefs] = useState( [] )

    const dispatch = useDispatch()

    function deleteRecord(table, id) { 

      api_deleteRecord(table, id, dispatch, () => {
        let newRecs = recs.filter( (r) => {
          return r.x_id != id          
        })

        setRecs( newRecs )
      })
    }

    // set recs
    useEffect(() => {
      setRecs( [...props.recs])
    },[props.recs])

    // set headerdefs
    useEffect(() => {

      if (!props.table) return

      // cb( fields [] {name, type, label, schema_type} ) api_getTableFields.v1
      api_getTableFields( props.table, dispatch, (fields) => {
        
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

    let history = useHistory()

    return (
      <>
        <h3>{tableLabel} ( {props.table} )</h3>

        <Button style={{marginTop:"1em", marginBottom:"2em"}} variant="contained" onClick={() => {
          history.push(`/table/${props.table}/new`)
        }}>
          New {tableLabel}
        </Button>   

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">

              <TableHead sx={{ '& .MuiTableCell-head': {backgroundColor: '#01579B'}}}>
                <TableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>

                  {headerDefs.map( (headerDef) => (
                    <StyledTableCell key={headerDef.label}>{headerDef.label}</StyledTableCell>
                  ) ) }
                </TableRow>
              </TableHead>

              <TableBody>
                  {recs.map((row) => (
                    
                    <StyledTableRow key={row.x_id}>
              
                      <StyledTableCell>
                        <Button component={Link} to={`/table/${props.table}/${row.x_id}`} variant="outlined" size="small" color="primary">
                          Edit
                        </Button>   
                      </StyledTableCell>
              
                      <StyledTableCell>
                        <Button variant="outlined" size="small" color="error" onClick={() => {
                            deleteRecord(props.table, row.x_id)
                        }}>Delete</Button>   
              
                      </StyledTableCell>
              
                      {headerDefs.map( (headerDef) => (
                        <StyledTableCell key={headerDef.field} >{row[ headerDef.field ] + ''}</StyledTableCell>
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