import React, {useEffect, useState} from 'react'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import axios from 'axios'

/*
props.table
props.formData
*/
const FormView = (props) => {
    const formData = props.formData

    console.log('BEFORE ******************** ' + JSON.stringify(formData));
    const [formPostJSON, setFormPostJSON] = useState( ()=> { return formData } ) 
    console.log('AFTER ******************** ' + JSON.stringify(formPostJSON));
    
    const saveForm = () => {
        const formPostValues = JSON.parse( formPostJSON )

        console.log('saving ******************** ' + JSON.stringify(formPostValues));


        // axios.put( 'http://localhost:8000/table/' + props.table + '/' + formData.x_id, formPostValues )
        //     .then( res => {                
        //         console.log('******************** ' + JSON.stringify(res));
        //     } )
        //     .catch(console.log)
    }

    const onChange = (value, field) => {
        let map = JSON.parse( formPostJSON )
        map[ field ] = value

        setFormPostJSON( JSON.stringify( map ) )
    }

    return (
        <div style={{padding:"1em"}}>
            
            <h1>{props.table}</h1>

            {Object.keys(formData).map( field => {

                const fieldValue = formData[ field ]

                return (
                    <div style={{marginTop:"2em"}}>
                        <TextField 
                            onChange={(e)=>{
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