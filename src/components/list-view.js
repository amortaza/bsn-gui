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
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import api_getTableFields from '../api/get_table_fields'

import Pagination from './pagination'

import api_deleteRecord from 'src/api/delete_record';
import { Chip, IconButton, TextField } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e3f0f3",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1em",
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

    props.query* for view only
    props.orderBy* for view only
    props.orderByDesc* for view only

    props.total

    props.setListPagination( index, size )
  */
const ListView = (props) => {

    const [tableLabel, setTableLabel] = useState( 'Unknown' )
    const [recs, setRecs] = useState( props.recs || [] )

    const [filter, setFilter] = useState( '' )
    
    // headerDefs = [ {field, label} ... ].v1
    const [headerDefs, setHeaderDefs] = useState( [] )

    const [orderByField, setOrderByField] = useState( '' )
    const [orderByDir, setOrderByDir] = useState( 'asc' )

    const dispatch = useDispatch()

    let history = useHistory()

    useEffect(() => {
      setOrderByField( props.orderBy || props.orderByDesc )

      if (props.orderBy)
        setOrderByDir('asc')
      else
        setOrderByDir('desc')

    }, [props.orderBy, props.orderByDesc])

    function urlFromState() {
      let url = `/table/${props.table}?nop=`
      
      let i = parseInt( props.pageIndex )
      if (!isNaN(i)) {
        url += `index=${i}`
      }

      i = parseInt( props.pageSize )
      if (!isNaN(i)) {
        url += `size=${i}`
      }

      if (props.query) {
        let encoded = encodeURIComponent(props.query)
        url += `&query=${encoded}`
      }
      
      if (orderByField && orderByDir == 'asc') {
        url += `&order_by=${orderByField}`  
      }

      if (orderByField && orderByDir == 'desc') {
        url += `&order_by_desc=${orderByField}`
      }

      return url
    }

    function onOrderBy(field) {
      if (field == orderByField) {
        if (orderByDir == 'asc') {
          setOrderByDir('desc')
        } else {
          setOrderByDir('asc')
        }
      } else {
        setOrderByDir('desc')
      }

      setOrderByField( field )
    }

    useEffect(() => {
      let url = urlFromState()

      history.push(url)

    },[orderByField, orderByDir])

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
          let field = fields[ i ]

          if ( field.schema_type == 'relation' ) {
            setTableLabel( field.label )
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

    

    function goFilter() {
      let encoded = encodeURIComponent(filter)
      history.push(`/table/${props.table}?query=${encoded}`)
    }

    let headerDefs_component = headerDefs.map( headerDef => {

      let desc = orderByDir == 'desc'
      let icon

      if ( orderByField == headerDef.field) {
        if (desc) {
          icon = <ArrowCircleDownTwoToneIcon  />
        } else {
          icon = <ArrowCircleUpTwoToneIcon  />
        }        
      }

      return (
        <StyledTableCell key={headerDef.label}>

          <IconButton color="success" style={{fontSize:"1.15em"}} onClick={() => {
            onOrderBy( headerDef.field)
          }}>
            <div style={{marginRight:"0.5em"}}>
              {headerDef.label}
            </div> 
            <div>{icon}</div>
          </IconButton>


        </StyledTableCell>
      )
      
      }) 

    return (
      <>
        <h3>{tableLabel} ( {props.table} )</h3>

        <Button style={{marginTop:"1em", marginBottom:"2em"}} variant="contained" onClick={() => {
          history.push(`/table/${props.table}/new`)
        }}>
          New {tableLabel}
        </Button>   

        <br/>

        <div style={{marginTop:"2em", marginBottom:"3em"}} >

          <TextField  label="Filter"                         
                      variant="standard" 
                      style={{marginRight:"2em",width:"30em"}} 
                      onChange={(e) => {
                              setFilter(e.target.value)
                      }} />  

          <Button variant="contained" style={{verticalAlign:"bottom"}} onClick={() => {
            goFilter()
          }}>
            Go!
          </Button>   

          </div>

          <div style={{marginBottom:"2em"}}>
            <Chip label={`Page-Index: ${props.pageIndex}`} />
            <Chip label={`Page-Size: ${props.pageSize}`} />
            <Chip label={`Order-By: ${props.orderBy}`} />
            <Chip label={`Order-By-Desc: ${props.orderByDesc}`} />
            <Chip label={`Query: ${props.query}`} />
          </div>


          <Pagination setListPagination={props.setListPagination} total={props.total} />


        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">

              <TableHead>
                <TableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>



                  {headerDefs_component}





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
      </>
    )
}

export default ListView