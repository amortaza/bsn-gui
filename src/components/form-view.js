/* eslint-disable */
import {useEffect, useState} from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import api_getTableFields from '../api/get_table_fields'
import {appMsg} from '../app/slice'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Fade, Tooltip } from '@mui/material';
import { useHistory } from 'react-router';

/*
props.table
props.id (can be 'new')
props.formData
*/
const FormView = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [formId, setFormId] = useState( props.id )

    const [form2post, setForm2Post] = useState( props.formData ) 

    const [fieldToLabel, setFieldToLabel] = useState( {} ) 
    const [tableLabel, setTableLabel] = useState( 'unknown' ) 

    // set form-to-post from formData
    useEffect( () => {
        
        setForm2Post(props.formData)

    }, [ props.formData ])

    // set field-to-label
    // set tableLabel
    // set empty form-to-Post
    // [ props.table, formId ]
    useEffect( () => {

        if (!props.table) return

        // cb( fields [] {name, type, label} ) api_getTableFields.v1
        api_getTableFields( props.table, dispatch, (fields) => {
            let map = {}
            let emptyRec = {}

            for (let i = 0;i < fields.length; i++) {
                let f = fields[i]

                if (f.schema_type == 'relation') {
                    setTableLabel(f.label)
                } else {
                    map[f.name] = f.label    
                }

                emptyRec[ f.name ] = ''
            }

            if (formId == 'new') {
                setForm2Post(emptyRec)
            }

            setFieldToLabel(map)
        })
    }, [ props.table, formId ] )

    const updateFormToServer = () => {
        
        axios.put( 'http://localhost:8000/table/' + props.table + '/' + props.formData.x_id, form2post )
            .then( res => {                
                appMsg("info", "Save successful!", dispatch)
            } )
            .catch((e) => {
                console.log('****************** ' + e);
                appMsg("error", "Failed to save form, see " + e, dispatch )
            })
    }

    const newFormToServer = () => {

        axios.post( 'http://localhost:8000/table/' + props.table, form2post )
            .then( res => {    
                
                if (res.data && res.data.length > 31) {
                    setFormId(res.data)
                    setForm2Post( { ...form2post, 'x_id': res.data} )
                }

                appMsg("info", "Save successful!", dispatch)
            } )
            .catch((e) => {
                console.log('****************** ' + e)
                appMsg("error", "Failed to save, see " + e, dispatch )
            })
    }

    function goBack() { 
        history.goBack()
    }

    const onChange = (e, value, field) => {
        e.preventDefault()

        var map = { ...form2post }
        map[ field ] = value
        setForm2Post(map)
    }

    let save_button = null

    if (formId == 'new') {
        save_button = <Button style={{marginTop:"2em"}} variant="contained" onClick={newFormToServer}>Create</Button>   
    } else {
        save_button = <Button style={{marginTop:"2em"}} variant="contained" onClick={updateFormToServer}>Update</Button>   
    }

    return (
        <div>
            
            <h3>{tableLabel} ( {props.table} )</h3>

            {Object.keys( form2post ).map( field => {
                const fieldValue = form2post[ field ]
                const label = fieldToLabel[ field ]

                return (
                    <div style={{marginTop:"2em"}} >

                        <Tooltip title={field} arrow TransitionComponent={Fade} TransitionProps={{ timeout: 1000 }} placement="right-start">

                        <TextField 

                            onChange={(e)=>{
                                onChange(e, e.target.value, field)
                            }}  

                            label={label} 
                            value={fieldValue} 
                            variant="standard"
                            key={field}
                        />

                        </Tooltip>

                    </div>
                )
            })}

            {save_button}
            <Button style={{marginLeft:"1em", marginTop:"2em"}} variant="contained" color="error" onClick={goBack}>Cancel</Button>   
            
        </div>
    )
}

export default FormView