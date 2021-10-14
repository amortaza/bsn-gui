import React, {useEffect, useState} from 'react'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import axios from 'axios'

/*
props.table
props.formData
props.isUpdateForm
*/
const FormView = (props) => {

    const [formToPost, setFormToPost] = useState( props.formData ) 

    useEffect( () => {
        setFormToPost( props.formData )
    }, [ props.formData ])

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
                console.log('******************** ' + JSON.stringify(res));
            } )
            .catch(console.log)
    }

    const postFormToServer = () => {
        axios.post( 'http://localhost:8000/table/' + props.table, formToPost )
            .then( res => {                
                console.log('******************** ' + JSON.stringify(res));
            } )
            .catch(console.log)
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
        <div style={{padding:"1em"}}>
            
            <h1>{props.table}</h1>

            {Object.keys(formToPost).map( field => {

                const fieldValue = formToPost[ field ]

                return (
                    <div style={{marginTop:"2em"}} key={+new Date() + Math.random(10000)}>
                        <TextField 
                            onBlur={(e)=>{
                                onChange(e.target.value, field)
                            }} 
                            id={field + '_id'} label={field} defaultValue={fieldValue} variant="standard" />
                    </div>
                )
            })}

            <Button style={{marginTop:"2em"}} variant="contained" onClick={saveForm}>Save</Button>   
        </div>
    )
}

export default FormView