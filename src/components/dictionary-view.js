/* eslint-disable */
import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import axios from 'axios'

import api_getTableFields from '../api/get_table_fields'

/*
*/
const DictionaryView = () => {

    // tableDefs = [ { table, label } ... ]
    const [tableDefs, setTableDefs] = useState( [] ) 
    const [filter, setFilter] = useState( '' ) 
    const dispatch = useDispatch()

    useEffect( () => {
        axios.get( 'http://localhost:8000/table/x_schema' )
            .then( res => {   

                // defs = [ table...]
                const defs = res.data.reduce( (tables, schemaRec) => {

                    if (schemaRec.x_type == 'relation') {
                        tables.push( {table: schemaRec.x_table, label: schemaRec.x_label} )
                    }

                    return tables
                }, [])         

                setTableDefs(defs)
            } )
            .catch(console.log)
            // todo dialog box here
    }, [] )
 
    const onChange = (e) => {
        setFilter( e.target.value )
    }

    const renderTables = () => {
        return tableDefs.map( ({table, label}) => {
            if (table.indexOf(filter) > -1 || label.indexOf(filter) > -1) {
                return (
                    <div key={table}>
                        <ListItem button onClick={() => {
                                // gotoDictionaryForm(table)
                            }}>

                            <ListItemText primary={label + ' ( ' + table + ' ) '}  />
                        </ListItem>
                        <Divider />
                    </div>
                )
            }
        })
    }

    return (
        <div style={{padding:"1em"}} >
            <h2>Dictionary</h2>

            <div style={{marginTop:"1em", marginBottom:"3em"}}>
                {/* New Button */}
                <Button style={{}} variant="contained" onClick={() => {
                    // gotoDictionaryForm("")
                }}>New Table</Button>   

                {/* Cancel Button */}
                <Button style={{marginLeft:"1em"}} onClick={historyRewind} variant="contained" >Cancel</Button>   
            </div>

            <TextField id="filter" label="Filter" variant="outlined" onChange={onChange} defaultValue={filter} />

            <div style={{height:"1em"}} />

            <List component="nav" aria-label="mailbox folders">
                {renderTables()}
            </List>            

        </div>
    )
}

export default DictionaryView