import React, { useEffect } from 'react'
import {useState} from 'react'
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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import { useSelector, useDispatch } from 'react-redux'

import { gotoUpdateFormView as gotoUpdateFormView_action } from '../app/slice'
import { gotoNewFormView as gotoNewFormView_action } from '../app/slice'

import Pagination from './pagination'

import api_deleteRecord from 'src/api/delete_record';


const Modules = () => {
    return (
        <div>
            Modules
        </div>
    )
}

export default Modules