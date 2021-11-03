/* eslint-disable */
import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import Typography from '@mui/material/Typography';

import axios from 'axios'
import AddField from '../widget/add-field';

import api_getTableFields from '../api/get_table_fields'
import api_deleteField from '../api/delete_field'
import api_getRowsByQuery from '../api/get_rows_by_query'

import { appMsg, flagSchemeUpdate } from 'src/app/slice';

/*
table
params.action create/update.v1.dictionary_form
*/
const DictionaryForm = (props) => {
    const dispatch = useDispatch()

    const [tableLabel, setTableLabel] = useState( "?" ) 
    const [table, setTable] = useState( props.table || "u_?" ) 

    const [fields, setFields] = useState( [] ) 
    const [action, setAction] = useState( props.action ) 
    

    useEffect(() => {
        setTable(props.table || "u_?")
        setAction(props.action)
    }, [props.table, props.action])

    useEffect( () => {

        if (props.table) {
            // cb( fields [] {name, type, label} ) api_getTableFields.v1
            api_getTableFields(props.table, dispatch, (fields) => {
                setFields(fields)
            })

            // table, pageIndex, pageSize, dispatch, cb( rows, totalCount ), filter, query, orderBy, orderByDesc.v4.api_getRowsByQuery
            api_getRowsByQuery('x_schema',0, 10000, dispatch, (rows) => {
                setTableLabel( rows[0].x_label )
            },
            (row) => {
                return row.x_type == 'relation' && row.x_table == props.table;
            })
        }

    }, [props.table])

    const css = {
        display: 'inline-block',
        verticalAlign:'top',
    }

    function deleteField(fieldToDelete) { 

        api_deleteField( table, fieldToDelete, dispatch, () => {
            const newFields = fields.filter((field) => {
                return field.name != fieldToDelete
            })

            setFields(newFields)
        })
    }

    function addField(field, label, type) { 
        axios.post( `http://localhost:8000/schema/table/${table}/field/${field}`, {type, label} )
            .then( res => {    
                const msg = `created field "${field}"`
                appMsg("success", msg, dispatch)

                setFields( [
                    ...fields,
                    {name:field, label, type}
                ] )
            } )
            .catch((err) => {
                const msg = `failed to get add field "${field}", see console for more details`
                console.log('****************** ' + msg)
                console.log('****************** ' + err)
                appMsg("error", msg, dispatch)
            })
    }

    function createTable() { 
        axios.post( `http://localhost:8000/schema/${table}`, {label: tableLabel, fields:[]} )
            .then( res => {    
                const msg = `created table "${table}"`
                appMsg("success", msg, dispatch)
                setAction('update')
                flagSchemeUpdate(dispatch)
            } )
            .catch((err) => {
                const msg = `failed to create table "${table}", see console for more details`
                console.log('****************** ' + msg)
                console.log('****************** ' + err)
                appMsg("error", msg, dispatch)
            })
    }

    const renderFields = () => {
        return fields.map( (field) => {
            return (
                <div key={`${field.name}:${field.label}`} style={{marginBottom:"1em"}}>
                    <div style={css}>
                        <Button size="small" variant="outlined" color="error" disabled={field.name == 'x_id'} style={{marginRight:"1em"}}onClick={() => {
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

    let add_field_component
    let table_label_textfield

    if (action=="update") {
        add_field_component = <AddField AddField={addField} />

        table_label_textfield = <TextField  
            label="Table Label" 
            value={tableLabel} 

            disabled={true} 
            variant="standard" 
            style={{marginRight:"2em"}} 
        />  

    } else {
        // new!!
        table_label_textfield = <TextField  
            label="Table Label" 
            defaultValue={tableLabel} 

            variant="standard" 
            style={{marginRight:"2em"}} 

            onChange={(e) => {
                setTableLabel(e.target.value)
                let t = ('u_' + e.target.value.toLowerCase()).replace(/[ ]/g, '_')

                setTable( t )
        }} />  
    }

    return (
        <>
            {table_label_textfield}

            <TextField  label="Table Name" 
                        
                        // defaultValue={props.table}
                        value={table} 
                        
                        disabled={action=="update"} 
                        variant="standard" 
                        style={{marginRight:"0.5em"}} 
                        onChange={(e) => {
                            e.target.value && setTable(e.target.value)
                    }} />  

            <Button style={{marginTop:"0.4em", marginLeft:"1em"}} disabled={action=="update"} variant="contained" onClick={() => {
                createTable()
            }}>Create Table</Button> 


            <div style={{marginBottom:"4em"}}/>

            {add_field_component}

            {/* List Fields */}
            <div style={{marginTop:"3em"}}>
                {renderFields()}
            </div> 
        </>
    )
}

export default DictionaryForm