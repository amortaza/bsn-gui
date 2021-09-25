import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

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

function ListView (props) {
    let headers = props.headers;
    let recs = props.recs;

    return (
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Table</StyledTableCell>
            <StyledTableCell>Field</StyledTableCell>
            <StyledTableCell>Type</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {/* align="right" */}

          {recs.map((row) => (
              
            <StyledTableRow key={row.Table}>

              <StyledTableCell component="th" scope="row">{row.Table}</StyledTableCell>
              <StyledTableCell>{row.Field}</StyledTableCell>
              <StyledTableCell>{row.Type}</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          )
}

export default ListView