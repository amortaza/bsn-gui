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

  /*
    props.table
    props.recs

    props.total

    props.setListPagination( index, size )
  */
const ListView = (props) => {
    
    const [pagination_pageIndex, setPagination_pageIndex] = useState( 0 )
    const [pagination_pageSize, setPagination_pageSize] = useState( 5 )

    const [gridRows, setGridRows] = useState( [] )

    // headerDefs = [ {field, label} ... ].v1
    const [headerDefs, setHeaderDefs] = useState( [] )
    const [gridCols, setGridCols] = useState( [] )

    const [tableLabel, setTableLabel] = useState( 'Unknown' )

    const dispatch = useDispatch()

    useEffect(() => {
      if (!props.table) return;

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

    function gotoNewFormView( table, tableLabel ) {
      dispatch(gotoNewFormView_action( { table, tableLabel } ))
    }

    function setListPagination(pageIndex, pageSize) {
      setPagination_pageIndex( pageIndex )
      setPagination_pageSize( pageSize )

      props.setListPagination(pageIndex, pageSize)      
    }

    // load grid rows
    useEffect(() => {
      let gridrows = props.recs.map((rec) => {
        let gridRow = { 
          ...rec,
          id: rec.x_id 
        }

        gridRow[ '-' ] = rec.x_id

        return gridRow
      })

      setGridRows(gridrows)

    }, [props.recs, headerDefs] )

    // load columns
    useEffect( () => {
      // headerDefs = [ {field, label} ... ].v1
      let cols = headerDefs.map( (def) => {
        return {
          field:def.field,
          headerName:def.label,
          description:def.field,
          width:120,
          minWidth:120,
          renderCell: null,
        }
      })

      cols.splice(0,0,{
        field:'-',
        headerName:'-',
        description:'',
        width:100,
        minWidth:100,
        renderCell: (params) => {
          return (
            <>
              <Button component={Link} to={`/table/${props.table}/${params.value}`} variant="outlined" size="small" color="primary">
                Edit
              </Button>   
            </>
          )
        }
    })

    console.log('****************** ' + JSON.stringify(cols))
      setGridCols(cols)
    }, [headerDefs] )

    let dg = (
      <DataGrid 
                rows={gridRows} columns={gridCols} 
                page={pagination_pageIndex} pageSize={pagination_pageSize} rowCount={props.total}
                paginationMode="server"
                disableSelectionOnClick
                onPageChange = {(newPage) => {
                  setListPagination(newPage, pagination_pageSize)
                }} 
              />
    )

    return (
      <>

        <h3>{tableLabel} ( {props.table} )</h3>

        <Button style={{marginTop:"1em", marginBottom:"2em"}} variant="contained" onClick={() => {
            gotoNewFormView( props.table, tableLabel )
        }}>New {tableLabel}</Button>   

        <div style={{ height: 400, width: '100%' }}>
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flexGrow: 1 }}>

            {dg}
            
            </div>
          </div>
        </div>

      </>
    )
}

export default ListView