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

import { gotoDictionaryForm as gotoDictionaryForm_action } from '../app/slice'

/*
*/
const DictionaryView = (props) => {

    const [tables, setTables] = useState( [] ) 
    const [filter, setFilter] = useState( '' ) 
    const dispatch = useDispatch()

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
 
    const onChange = (e) => {
        setFilter( e.target.value )
    }

    const style = {
        maxWidth: "8em",
    }  
    
    const gotoDictionaryForm  = (table) => {
        const params =  {
            action: table == "" ? "create" : "update",
            table
        }

        dispatch(gotoDictionaryForm_action(params))
    }

    const renderTables = () => {
        return tables.map( (table) => {
            if (table.indexOf(filter) > -1) {
                return (
                    <div key={table}>
                        <ListItem button onClick={() => {
                                gotoDictionaryForm(table)
                            }}>

                            <ListItemText primary={table}  />
                        </ListItem>
                        <Divider />
                    </div>
                )
            }
        })
    }

    return (
        <div style={{padding:"1em"}}>
            <h2>Dictionary</h2>

            <Button style={{marginTop:"1em", marginBottom:"3em"}} variant="contained" onClick={() => {
                gotoDictionaryForm("")
            }}>New Table</Button>   

            <br/>

            <TextField id="filter" label="Filter" variant="outlined" onChange={onChange} defaultValue={filter} />

            <div style={{height:"1em"}} />

            <List sx={style} component="nav" aria-label="mailbox folders">
                {renderTables()}
            </List>            

        </div>
    )
}

export default DictionaryView