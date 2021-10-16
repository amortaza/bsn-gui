import React from 'react'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import { useSelector, useDispatch } from 'react-redux'

import { gotoUpdateFormView as gotoUpdateFormView_action } from '../app/slice'
import { gotoNewFormView as gotoNewFormView_action } from '../app/slice'

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
  */
const ListView = (props) => {
    const dispatch = useDispatch()

    let headers = props.headers;
    let recs = props.recs;

    function gotoUpdateFormView( table, recordId ) {
      dispatch(gotoUpdateFormView_action( { table, recordId } ))
    }
    
    function gotoNewFormView( table ) {
      dispatch(gotoNewFormView_action( { table } ))
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
                  {headers.map( (header) => (
                    <StyledTableCell>{header}</StyledTableCell>
                  ) ) }
                </TableRow>
              </TableHead>
              <TableBody>
                  {/* align="right" */}

                {recs.map((row) => (
                    
                  <StyledTableRow key={row.Table}>

                    {headers.map( (header) => (
                      <StyledTableCell>{row[ header ]}</StyledTableCell>
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