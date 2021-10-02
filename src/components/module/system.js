import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  };


export default function SystemModule() {
  const [expanded, setExpanded] = React.useState('panel1');

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
}));

return (
    <div>
        {/* <List sx={style} component="nav" aria-label="mailbox folders">
        <ListItem button>
            <ListItemText primary="Dictionary" />
        </ListItem>
        <Divider />
        <ListItem button divider>
            <ListItemText primary="Scripts" />
        </ListItem>
        <ListItem button>
            <ListItemText primary="Security" />
        </ListItem>
        <Divider light />
        <ListItem button>
            <ListItemText primary="Logs" />
        </ListItem>
        </List> */}

        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1d-content" id="panel1d-header">
            <Typography>System</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Dictionary
            </Typography>
          </AccordionDetails>

          <AccordionDetails>
            <Typography>
              Scripts
            </Typography>
          </AccordionDetails>

          <AccordionDetails>
            <Typography>
              Security
            </Typography>
          </AccordionDetails>

          <AccordionDetails>
            <Typography>
              Logs
            </Typography>
          </AccordionDetails>

        </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
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
      </Accordion> 

      <Accordion disabled>
      <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Bitcoin Wallets</Typography>
        </AccordionSummary>
      </Accordion>

    </div>
  );
}







      /* <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>System</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Dictionary
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Comming soon...
          </Typography>
        </AccordionDetails>
      </Accordion> */
