/* eslint-disable */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { selector as appSelector, appMsg } from '../app/slice'

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function SystemModule() {
  const appState = useSelector( appSelector )

  const [expanded, setExpanded] = React.useState('panel1');
  const [tables, setTables] = useState([])

  const dispatch = useDispatch()

  useEffect( () => {

    axios.get( 'http://localhost:8000/table/x_schema' )
        .then( res => {   
            const tables = res.data.reduce( (tables, schemaRec) => {
                if (schemaRec.x_type == 'relation') {
                    tables.push( { table: schemaRec.x_table, tableLabel: schemaRec.x_label } )
                }

                return tables
            }, [])         
            
            setTables(tables)
        } )
        .catch((err) => {
          const msg = `failed to get schema information, see console for more details`
          console.log('****************** ' + msg)
          console.log('****************** ' + err)
          appMsg("error", msg, dispatch)
      })

  }, [ appState.schemeRefreshFlag_count ] )

  function renderTables() { 
    return tables.map( ({table, tableLabel}) => {
      return (
        <AccordionDetails key={table}>
          <Link to={`/table/${table}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            <div style={{ paddingLeft: 13 }}>{tableLabel + ' ( ' + table + ' )'}</div>
          </Link>
        </AccordionDetails>
      )
    })
  }

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>System</Typography>
          </AccordionSummary>

          <AccordionDetails key="dictionary">
            <Link to={`/schema`} style={{ color: 'inherit', textDecoration: 'none' }}>
              <div style={{ paddingLeft: 13 }}>Dictionary</div>
            </Link>
          </AccordionDetails>

        </Accordion>

        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>

          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Tables</Typography>
          </AccordionSummary>

          {renderTables()}

        </Accordion> 

    </div>
  );
}
