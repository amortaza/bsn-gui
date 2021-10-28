import React, {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import api_getTableFields from '../api/get_table_fields'
import {historyRewind as historyRewind_action, appMsg} from '../app/slice'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

/*
props.table
props.tableLabel
props.formData
props.isUpdateForm
*/
const FormView = (props) => {
    const dispatch = useDispatch()

    const [formToPost, setFormToPost] = useState( props.formData ) 
    const [fieldToLabel, setFieldToLabel] = useState( {} ) 

    useEffect( () => {
        setFormToPost( props.formData )

    }, [ props.formData ])

    useEffect( () => {

        // console.log('****************** form view table is ' + props.table);

        if (!props.table) return
        
        // cb( fields [] {name, type, label} ) api_getTableFields.v1
        api_getTableFields( props.table, (fields) => {
            let map = {}
            for (let i = 0;i < fields.length; i++) {
                let f = fields[i]
                map[f.name] = f.label
            }
            setFieldToLabel(map)
        })
    }, [ props.table ] )

    const historyRewind = () => {
        dispatch(historyRewind_action())
    }

    const saveForm = () => {
        if (props.isUpdateForm) {
            putFormToServer()
        } else {
            postFormToServer()
        }       
    }

    const putFormToServer = () => {
        axios.put( 'http://localhost:8000/table/' + props.table + '/' + props.formData.x_id, formToPost )
            .then( res => {                
                // console.log('******************** ' + JSON.stringify(res));
                appMsg("info", "Save successful!", dispatch)
            } )
            .catch((e) => {
                console.log('****************** ' + e);
                appMsg("error", "Failed to save form, see " + e, dispatch )
            })
    }

    const postFormToServer = () => {
        axios.post( 'http://localhost:8000/table/' + props.table, formToPost )
            .then( res => {                
                appMsg("info", "Save successful!", dispatch)
            } )
            .catch((e) => {
                console.log('****************** ' + e)
                appMsg("error", "Failed to save, see " + e, dispatch )
            })
    }

    const onChange = (value, field) => {
        console.log(`****************** ${field} ${value}`);

        let map = {
            ...formToPost
        }

        map[ field ] = value

        setFormToPost( map )
    }

    return (
        <div>
            
            <h3>{props.tableLabel} ( {props.table} )</h3>

            {Object.keys(formToPost).map( field => {

                const fieldValue = formToPost[ field ]
                const label = fieldToLabel[ field ]

                return (
                    <div style={{marginTop:"2em"}} key={+new Date() + Math.random(10000)}>

                        <TextField 

                            onChange={(e)=>{
                                onChange(e.target.value, field)
                            }} 

                            id={field + '_id'} disabled={field == 'x_id'} label={label} defaultValue={fieldValue} 
                            variant="standard" />

                    </div>
                )
            })}


            <Button style={{marginTop:"2em"}} variant="contained" onClick={saveForm}>Save</Button>   
            <Button style={{marginTop:"2em", marginLeft:"1em"}} onClick={historyRewind} variant="contained" >Cancel</Button>   
        </div>
    )
}

export default FormView