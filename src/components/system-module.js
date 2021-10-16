/* eslint-disable */
import * as React from 'react';
import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {AccordionSummaryProps} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import {useEffect} from 'react'
import axios from 'axios'
import { gotoListView as gotoListView_action } from '../app/slice'
import { gotoUpdateFormView as gotoUpdateFormView_action } from '../app/slice'
import { gotoNewFormView as gotoNewFormView_action } from '../app/slice'
import { gotoDictionaryView as gotoDictionaryView_action } from '../app/slice'

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  };


export default function SystemModule() {

  const [expanded, setExpanded] = useState('panel1')
  const [tables, setTables] = useState([])

  const dispatch = useDispatch()

  function gotoListView( table ) {
    dispatch(gotoListView_action( { table } ))
  }

  function gotoUpdateFormView( table, recordId ) {
    dispatch(gotoUpdateFormView_action( { table, recordId } ))
  }

  function gotoNewFormView( table ) {
    dispatch(gotoNewFormView_action( { table } ))
  }

  function gotoDictionaryView( table ) {
    dispatch(gotoDictionaryView_action( { table } ))
  }

  function renderTables() { 
    return tables.map( (table) => {
      return (
        <AccordionDetails onClick={()=>gotoListView(table)}>
          <Typography>{table}</Typography>
        </AccordionDetails>
      )
    })
  }

  useEffect( () => {

    axios.get( 'http://localhost:8000/table/x_schema' )
        .then( res => {   
            const tables = res.data.reduce( (tables, schemaRec) => {
                if (schemaRec.x_type == 'relation') {
                    tables.push( schemaRec.x_table )                        
                }

                return tables
            }, [])         
            
            setTables(tables)
        } )
        .catch(console.log)
        // todo dialog box here
}, [] )





  const handleChange =
  // string React.SyntheticEvent boolean
    (panel) => (event, newExpanded ) => {
      setExpanded(newExpanded ? panel : false);
    };

// AccordionProps
const Accordion = styled((props ) => (
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

// AccordionSummaryProps
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
  cursor: 'pointer'

}));

return (
    <div>

        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1d-content" id="panel1d-header">
            <Typography>System</Typography>
          </AccordionSummary>

          <AccordionDetails onClick={()=>gotoDictionaryView()}>
            <Typography>
              Dictionary
            </Typography>
          </AccordionDetails>

          {/* <AccordionDetails onClick={()=>gotoListView('x_choice_list')}>
            <Typography>
              Choice List
            </Typography>
          </AccordionDetails> */}

          {/* <AccordionDetails onClick={()=>gotoUpdateFormView( 'x_choice_list', '0c8e07932620473ab290b781911dbe9f' )}>
              Update Form View "Choice List"

          <AccordionDetails onClick={()=>gotoNewFormView( 'x_choice_list' )}>
            <Typography>
              New Form View "Choice List"
            </Typography>
          </AccordionDetails> */}

        </Accordion>


        <Accordion expanded={expanded === 'panel_tables'} onChange={handleChange('panel_tables')}>

          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-tables-content" id="panel-tables-header">
            <Typography>Tables</Typography>
          </AccordionSummary>

          {renderTables()}

        </Accordion> 




      {/* <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Incidents</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Create
          </Typography>
        </AccordionDetails>
        <AccordionDetails>
          <Typography>
            My Incidents
          </Typography>
        </AccordionDetails>
      </Accordion>  */}

      {/* <Accordion disabled>
      <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Bitcoin Wallets</Typography>
        </AccordionSummary>
      </Accordion> */}

    </div>
  );
}


