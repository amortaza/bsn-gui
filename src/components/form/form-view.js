import React, {useEffect, useState} from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const FormView = (props) => {
    const formData = props.formData 

    return (
        <div style={{padding:"1em"}}>
            
            <h1>{props.table}</h1>

            {Object.keys(formData).map( field => {

                const fieldValue = formData[ field ]

                return (
                    <div style={{marginTop:"2em"}}>
                        <TextField id={field} label={field} defaultValue={fieldValue} variant="standard" />
                    </div>
                )
            })}

            <Button style={{marginTop:"2em"}} variant="contained">Save</Button>   
        </div>
    )
}

export default FormView