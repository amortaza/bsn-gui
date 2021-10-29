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
    
    const [pagination_pageIndex, setPagination_pageIndex] = useState( 0 )
    const [pagination_pageSize, setPagination_pageSize] = useState( 5 )

    const [recs, setRecs] = useState( props.recs )
    const [gridRows, setGridRows] = useState( [] )

    // headerDefs = [ {field, label} ... ].v1
    const [headerDefs, setHeaderDefs] = useState( [] )
    const [gridCols, setGridCols] = useState( [] )

    const dispatch = useDispatch()

    useEffect(() => {

      // cb( fields [] {name, type, label} ) api_getTableFields.v1
      
      if (!props.table) return;

      // console.log('ListView calling api_getTableFields for table ' + props.table);

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
      setPagination_pageIndex( pageIndex )
      setPagination_pageSize( pageSize )

      props.setListPagination(pageIndex, pageSize)      
    }

    useEffect(() => {
      let rows = props.recs.map((rec) => {
        let gridRow = { 
          ...rec,
          id: rec.x_id 
        }

        gridRow[ '-' ] = rec.x_id

        return gridRow
      })
      setGridRows(rows)
    }, [props.recs, headerDefs] )

    useEffect( () => {
      // headerDefs = [ {field, label} ... ].v1
      let cols = headerDefs.map( (def) => {
        return {
          field:def.field,
          headerName:def.label,
          description:def.field,
          width:200,
          minWidth:200,
          renderCell: null,
        }
      })

      cols.splice(0,0,{
        field:'-',
        headerName:'-',
        description:'',
        width:210,
        minWidth:200,
        renderCell: (params) => {
          return (
            <>
              <Button variant="outlined" size="small" color="primary" onClick={() => {
                gotoUpdateFormView( props.table, props.tableLabel, params.value )
              }}>Edit</Button>   

              <Button variant="outlined" size="small" color="error" style={{marginLeft:"2em"}} onClick={() => {
                deleteRecord(props.table, params.value)
              }}>Delete</Button>   
            </>
          )
        }
    })

      setGridCols(cols)
    }, [headerDefs] )

    return (
      <>
        <h3>{props.tableLabel} ( {props.table} )</h3>

        <Button style={{marginTop:"1em", marginBottom:"2em"}} variant="contained" onClick={() => {
            gotoNewFormView( props.table, props.tableLabel )
        }}>New {props.tableLabel}</Button>   

        <div style={{ height: 400, width: '100%' }}>
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid 
                rows={gridRows} columns={gridCols} 
                page={pagination_pageIndex} pageSize={pagination_pageSize} rowCount={props.total}
                paginationMode="server"
                onPageChange = {(newPage) => {
                setListPagination(newPage, pagination_pageSize)
              }}/>
            </div>
          </div>
        </div>
      </>
    )
}

export default ListView