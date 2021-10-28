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
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import axios from 'axios'
import { Save } from '@mui/icons-material';
import AddField from '../widget/add-field';
import api_getTableFields from '../api/get_table_fields'
import api_deleteField from '../api/delete_field'
import {historyRewind as historyRewind_action, appMsg} from '../app/slice'

 
/*
table
action: create / update
*/
const DictionaryForm = (props) => {
    const dispatch = useDispatch()

    const [fields, setFields] = useState( [] ) 
    const [table, setTable] = useState( props.table ) 
    const [action, setAction] = useState( props.action ) 

    useEffect(() => {
        setTable(props.table)
        setAction(props.action)
    }, [props.table, props.action])

    useEffect( () => {

        if (table) {
            // cb( fields [] {name, type, label} ) api_getTableFields.v1
            api_getTableFields(table, (fields) => {
                setFields(fields)
            })
        }

    }, [props.table])

    const css = {
        display: 'inline-block',
        "vertical-align":'top',
    }


    function deleteField(fieldToDelete) { 

        api_deleteField( table, fieldToDelete, dispatch, () => {
            const newFields = fields.filter((field) => {
                return field.name != fieldToDelete
            })

            setFields(newFields)

            appMsg("info", "Deleted field successfully!", dispatch)
        })
    }

    function addField(field, label, type) { 
        axios.post( `http://localhost:8000/schema/table/${table}/field/${field}`, {type, label} )
            .then( res => {    
                if ( res.status != 200 ) {
                    console.log('******************** ' + JSON.stringify(res));
                    appMsg("error", "Fail, see " + res.status, dispatch )
                } else {
                    setFields( [
                        ...fields,
                        {name:field, label, type}
                    ] )

                    appMsg("info", "Created field successfully!", dispatch)
                }
            } )
            .catch((e) => {
                console.log('****************** ' + e);
                appMsg("error", "Fail, see " + e, dispatch );
            })
    }

    function createTable() { 
        axios.post( 'http://localhost:8000/schema/' + table, {fields:[]} )
            .then( res => {    
                if ( res.status != 200 ) {
                    appMsg("error", "Failed to create table, see " + JSON.stringify(res), dispatch )

                } else {
                    setAction('update')
                    appMsg('info', 'Created table successfully!', dispatch)
                }
            } )
            .catch((e) => {
                console.log('****************** ' + e);
                appMsg("error", "Failed to create table, see " + e, dispatch );
            })
    }

    const historyRewind = () => {
        dispatch(historyRewind_action())
    }

    const css2 = {
        marginBottom: '2em',
    }

    const css3 = {
        marginRight: '2em',
    }

    const renderFields = () => {
        return fields.map( (field) => {
            return (
                <div style={css2} key={field.name}>
                    <div style={css}>
                        <Button style={css3} size="small" variant="outlined" color="error" disabled={field.name == 'x_id'} onClick={() => {
                            deleteField(field.name)
                        }}>
                        Delete Field
                        </Button>   
                    </div>

                    <div style={css}>
                        <Typography>
                        <b>{field.label}</b> ( {field.name} : {field.type} )
                        </Typography>
                    </div>
                </div>
            )
        })
    }

    return (
        <div style={{padding:"1em"}}>

            <TextField label="Table Name" defaultValue={props.table} disabled={action=="update"} variant="standard" style={{marginBottom:"2em"}} 
                onChange={(e) => {
                    setTable(e.target.value)
             }} />  

            <Button style={{marginTop:"0.4em", marginLeft:"1em"}} disabled={action=="update"} variant="contained" onClick={() => {
                createTable()
            }}>Create Table</Button> 

            <Button style={{marginTop:"0.4em", marginLeft:"1em"}} onClick={historyRewind} variant="contained" >Back</Button>   

            <div/>

            <AddField AddField={addField} />

            {/* List Fields */}

            <div>
                {renderFields()}
            </div> 

        </div>
    )
}

export default DictionaryForm