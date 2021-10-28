/* eslint-disable */
import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

/*
props.AddField( field, label, fieldType)
*/
const AddField = (props) => {

    const [field, setField] = useState( "" ) 
    const [label, setLabel] = useState( "" ) 
    const [fieldType, setFieldType] = useState( "String" ) 

    return (
        <div >
            <TextField label="Label" defaultValue=""  variant="standard" 
                onChange={(e) => {
                    setLabel(e.target.value)
             }} />  

            <TextField label="Field Name" defaultValue=""  variant="standard" style={{marginLeft:"1em"}} 
                onChange={(e) => {
                    setField(e.target.value)
             }} />  


            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={fieldType}
                label="Field Type"
                style={{marginLeft:"1em",marginTop:"0.8em"}}
                variant="standard"
                onChange={(e) => {
                    setFieldType(e.target.value)
                }}
            >
                <MenuItem value="String">String</MenuItem>
                <MenuItem value="Number">Number</MenuItem>
                <MenuItem value="Bool">True / False</MenuItem>
            </Select>

            

            <Button style={{marginLeft:"1em"}} variant="outlined" onClick={() => {
                props.AddField( field, label, fieldType)
            }}>Add Field</Button> 

        </div>
    )
}

export default AddField